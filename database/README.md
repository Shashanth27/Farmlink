# Mandi Prices Database

This folder contains a SQLite database of AGMARKNET mandi price data.

## Overview

The database stores agricultural market (mandi) price information, including commodity details, market locations, arrival dates, and price statistics. It is designed for easy querying and analysis using SQLite.

## Database

* **File:** `mandi_prices.db`
* **Database Type:** SQLite

## Data Includes

* State
* District
* Market
* Commodity
* Variety
* Grade
* Arrival Date
* Arrival Quantity
* Minimum Price
* Maximum Price
* Modal Price

## Usage

You can open the database using any SQLite client such as:

* DB Browser for SQLite
* SQLiteStudio
* SQLite command-line tool
* Python (`sqlite3` module)

Example in Python:

```python
import sqlite3

conn = sqlite3.connect("mandi_prices.db")

query = "SELECT * FROM mandi_market_data LIMIT 10;"
rows = conn.execute(query).fetchall()

for row in rows:
    print(row)

conn.close()
```

## Use Cases

* Agricultural price analysis
* Market trend analysis
* Data visualization
* Machine learning and forecasting
* Research and reporting

