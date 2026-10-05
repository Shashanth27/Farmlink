import sys
from pathlib import Path

from fastapi import APIRouter


# EVALUATIONS_DIR = Path(__file__).resolve().parents[3] / "evaluations"
# if str(EVALUATIONS_DIR) not in sys.path:
#     sys.path.append(str(EVALUATIONS_DIR))


from evaluations.model import call_gemma
from evaluations.agmarknet_api import fetch_historical_prices

router = APIRouter(prefix="/advisory", tags=["Advisory"])


@router.post("/")
def get_advisory(data: dict):
    print("Inside API")
    commodity = data.get("crop") or "Tomato"
    state = data.get("state") or "Andhra Pradesh"
    district = data.get("district") or "Palamaner"
    market = data.get("market") or "Palamaner APMC"
    latitude = float(data.get("latitude", 13.552040))
    longitude = float(data.get("longitude", 78.505798))
    language = data.get("language") or "Telugu"

    try:
        recommendation = call_gemma(
            commodity=commodity,
            state=state,
            district=district,
            market=market,
            latitude=latitude,
            longitude=longitude,
            language=language,
        )
        print("Printing Recomendation")
        print(recommendation)
    except Exception as exc:
        recommendation = f"Unable to generate advisory right now: {exc}"

    historic_prices = fetch_historical_prices(
        commodity=commodity,
        state=state,
        market=market,
        district=district,
    )

    if historic_prices.empty:
        market_payload = {
            "market_name": market,
            "current_price": "₹2200 / Quintal",
            "modal_price": 2200,
            "max_price": 2350,
            "min_price": 2050,
        }
    else:
        latest_row = historic_prices.iloc[-1]
        market_payload = {
            "market_name": market,
            "current_price": f"₹{latest_row['modal_price']} / Quintal",
            "modal_price": latest_row["modal_price"],
            "max_price": latest_row["max_price"],
            "min_price": latest_row["min_price"],
        }
    
    
    return {
        "weather": {
            "temperature": "32°C",
            "humidity": "72%",
            "rainfall": "10%",
        },
 "market": {
    **market_payload,
    "trend": "Increasing",
},
"crop": {
    "harvest_tip": "Harvest within 2 days",
    "storage_tip": "Can be stored for 5 days",
    "best_selling_period": "This Week",
},
"recommendation": recommendation,
"confidence": 88,
"risk_level": "Low",
    }