import os
import sqlite3

import pandas as pd
import requests
from typing import Optional
from dotenv import load_dotenv

from app.paths import seed_if_missing, user_data_dir

load_dotenv()

API_KEY = os.getenv("DATA_GOV_API_KEY")

RESOURCE_ID = os.getenv("RESOURCE_ID")
API_URL = f"https://api.data.gov.in/resource/{RESOURCE_ID}"

DB_PATH = seed_if_missing(user_data_dir() / "mandi_prices.db", "mandi_prices.db")

SUPPORTED_COMMODITIES = {
    "Brinjal",
    "Cauliflower",
    "Green Chilli",
    "Onion",
    "Potato",
    "Tomato",
}


# - 1. Fetch the latest mandi prices from the agmarknet API -----------------

def fetch_current_prices(
        state: str,
        commodity: str,
        limit: int = 100,
        market: Optional[str] = None,
        district: Optional[str] = None,
        timeout: int = 30,
) -> Optional[pd.DataFrame]:
    """
    Hits the data.gov.in agmarknet resource for the most recent record
    matching state/commodity(/market)(/district). Returns None on any
    failure so the caller can fall back to the last known CSV value.
    """
    params = {
        "api-key": API_KEY,
        "format": "json",
        "limit": limit,
        "filters[state.keyword]": state,
        "filters[commodity]": commodity,
    }
    if market:
        params["filters[market]"] = market
    if district:
        params["filters[district]"] = district

    headers = {"Accept": "application/json", "User-Agent": "Mozilla/5.0"}

    try:
        response = requests.get(API_URL, params=params, timeout=timeout, headers=headers)
        response.raise_for_status()
        data = response.json()

        if data.get("status") != "ok":
            raise RuntimeError(f"data.gov.in returned: {data}")
        records = data.get("records") or []
        return pd.DataFrame(records) if records else pd.DataFrame()
    except requests.RequestException as e:
        print(f"[agmarknet_api] API error: {e}")
        return None


# ── 2. Convert API records to your database schema ───────────────────────────

def normalize_api_data(raw_df):
    """
    Convert API data to your existing database columns.

    Fields unavailable in the API are deliberately None:
    commodity_group, arrival_quantity, arrival_unit.
    """
    if raw_df.empty:
        return pd.DataFrame()

    df = raw_df.copy()

    # API date is DD/MM/YYYY -> database date is YYYY-MM-DD
    df["arrival_date"] = pd.to_datetime(
        df["arrival_date"],
        format="%d/%m/%Y",
        errors="coerce",
    ).dt.strftime("%Y-%m-%d")

    # API price fields can arrive as strings
    for col in ["min_price", "max_price", "modal_price"]:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    # Missing in this API
    df["commodity_group"] = 'Vegetables'
    df["price_unit"] = "Rs./Quintal"
    df["arrival_quantity"] = None
    df["arrival_unit"] = None

    # Keep only the commodities already supported by your database
    df = df[df["commodity"].isin(SUPPORTED_COMMODITIES)].copy()

    # Remove unusable rows
    df = df.dropna(
        subset=["state", "market", "commodity", "arrival_date", "modal_price"]
    )

    # Prevent duplicate rows returned in one API response
    key_columns = [
        "arrival_date",
        "state",
        "district",
        "market",
        "commodity",
        "variety",
        "grade",
    ]
    df = df.drop_duplicates(subset=key_columns, keep="last")

    db_columns = [
        "state",
        "district",
        "market",
        "commodity_group",
        "commodity",
        "variety",
        "grade",
        "min_price",
        "max_price",
        "modal_price",
        "price_unit",
        "arrival_quantity",
        "arrival_unit",
        "arrival_date",
    ]

    return df[db_columns]


# ── 3. Insert/update without deleting agmarknet arrival values ───────────────

def upsert_prices_to_db(df):
    """
    Insert API rows into the same table.

    If a record already exists for the same market/crop/date:
    - price fields are updated
    - commodity_group, arrival_quantity, and arrival_unit are preserved
    """
    if df.empty:
        print("No supported mandi records found in the API response.")
        return 0

    rows = df.where(pd.notna(df), None).to_dict(orient="records")

    conn = sqlite3.connect(str(DB_PATH))

    conn.executemany(
        """
        INSERT INTO mandi_market_data (
            state, district, market, commodity_group, commodity,
            variety, grade, min_price, max_price, modal_price,
            price_unit, arrival_quantity, arrival_unit, arrival_date
        )
        VALUES (
            :state, :district, :market, :commodity_group, :commodity,
            :variety, :grade, :min_price, :max_price, :modal_price,
            :price_unit, :arrival_quantity, :arrival_unit, :arrival_date
        )
        ON CONFLICT(
            arrival_date, state, district, market,
            commodity, variety, grade
        )
        DO UPDATE SET
            min_price = excluded.min_price,
            max_price = excluded.max_price,
            modal_price = excluded.modal_price,
            price_unit = excluded.price_unit
        """,
        rows,
    )

    conn.commit()
    conn.close()

    return len(rows)

# ── 4. Run one complete daily sync ───────────────────────────────────────────

def sync_daily_mandi_prices(
    state: str,
    commodity: str,
    limit: int = 100,
    market: Optional[str] = None,
    district: Optional[str] = None,
    timeout: int = 30,
    ):
    raw_df = fetch_current_prices(state=state, commodity=commodity, limit=limit, market=market, district=district)

    if raw_df is None or raw_df.empty:
        print(f"No API data found for {commodity} in {state}.")
        return

    clean_df = normalize_api_data(raw_df)
    synced_rows = upsert_prices_to_db(clean_df)

    print(f"Raw API records fetched: {len(raw_df)}")
    print(f"Rows synced for your six commodities: {synced_rows}")



def sync_all_commodities():
    commodity = ["Tomato", "Onion", "Potato", "Cauliflower", "Brinjal", "Green Chilli"]
    for item in commodity:
        print(f"Syncing daily mandi prices for {item} in Andhra Pradesh...")
        sync_daily_mandi_prices(state="Andhra Pradesh", commodity=item, limit=100)
        print("\n" + "=" * 50 + "\n")


def fetch_historical_prices(
    commodity: str,
    market: str | None = None,
    variety: str | None = None,
    state: str | None = None,
    district: str | None = None,
    days: int = 7,
    db_path: str = DB_PATH,
) -> pd.DataFrame:
    """
    Fetch recent mandi-price records with optional location and variety filters.

    If market/variety are omitted, returns records across all matching
    markets/varieties. `days` means the latest N distinct reporting dates,
    not merely N rows.
    """

    query = """
    SELECT
        arrival_date,
        state,
        district,
        market,
        commodity_group,
        commodity,
        variety,
        grade,
        min_price,
        max_price,
        modal_price,
        price_unit,
        arrival_quantity,
        arrival_unit
    FROM mandi_market_data
    WHERE commodity = ?
    """

    params = [commodity]

    if market is not None:
        query += " AND market = ?"
        params.append(market)

    if variety is not None:
        query += " AND variety = ?"
        params.append(variety)

    if state is not None:
        query += " AND state = ?"
        params.append(state)

    if district is not None:
        query += " AND district = ?"
        params.append(district)

    # Select latest N DISTINCT dates first, then return all matching rows
    query += """
    AND arrival_date IN (
        SELECT DISTINCT arrival_date
        FROM mandi_market_data
        WHERE commodity = ?
    """

    date_params = [commodity]

    if market is not None:
        query += " AND market = ?"
        date_params.append(market)

    if variety is not None:
        query += " AND variety = ?"
        date_params.append(variety)

    if state is not None:
        query += " AND state = ?"
        date_params.append(state)

    if district is not None:
        query += " AND district = ?"
        date_params.append(district)

    query += """
        ORDER BY arrival_date DESC
        LIMIT ?
    )
    ORDER BY arrival_date ASC, market ASC, variety ASC
    """

    params.extend(date_params)
    params.append(days)

    with sqlite3.connect(str(db_path)) as conn:
        history = pd.read_sql_query(query, conn, params=params)

    history["arrival_date"] = pd.to_datetime(history["arrival_date"])
    return history


