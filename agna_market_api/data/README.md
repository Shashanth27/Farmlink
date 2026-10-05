# Agmarket CSV to SQLite Converter

This notebook [```convert_db.ipynb```] reads AGMARKNET CSV files, cleans the data, removes duplicates, and stores the results in a SQLite database.

The datasets in folder ``` ./raw ``` is from ag marknet website: [AG MARKNET](https://www.agmarknet.gov.in/daily-price-and-arrival-report)

The datasets we fetched is from 1 June 2026. Then we converted it into database.

## Features

- Reads all CSV files from the `raw/` folder.
- Cleans and standardizes the data.
- Converts numeric and date fields to the correct format.
- Removes duplicate records.
- Creates a SQLite database table.
- Inserts or updates market price records.



## Usage

1. Place the downloaded AGMARKNET CSV files inside the `raw/` folder.
2. Open and run `convert_db.ipynb`.
3. The notebook will:
   - Read all CSV files
   - Clean and combine the data
   - Create the SQLite database
   - Insert the processed records

The output database will be created at:

```
database/mandi_prices.db
```

## Database Table

The notebook creates a table named:

```
mandi_market_data
```

It stores information such as:

- State
- District
- Market
- Commodity
- Variety
- Grade
- Minimum Price
- Maximum Price
- Modal Price
- Arrival Quantity
- Arrival Date

## Notes

- Duplicate records are automatically removed.
- Existing records are updated if the same market data already exists.
- Dates are stored in `YYYY-MM-DD` format.




