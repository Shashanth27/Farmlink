# Agmarknet API Integration

This module provides a Python interface for fetching, normalizing, storing, and retrieving agricultural market (mandi) price data from the data.gov.in Agmarknet API.

Everything about the api is in ```/notebooks/agmarknet.ipynb```

It is designed to:

- Fetch the latest mandi prices from the Agmarknet API.
- Normalize API responses into a consistent database schema.
- Synchronize daily market prices into a local SQLite database.
- Preserve historical arrival information while updating prices.
- Retrieve historical price data for analysis or forecasting.

The implementation is intended for agricultural analytics, price forecasting, and market intelligence applications.


``` State```: The name of the Indian state where the market (mandi) is located (e.g., Andhra Pradesh).

``` District```: The specific district within the state where the market operates.

```Market```: The name of the specific agricultural produce market committee (APMC) or mandi where the price and arrival data were recorded.

```Commodity```: The name of the agricultural product being sold (e.g., Groundnut).

```Variety```: The specific type or cultivar of the commodity (e.g., "Local").

```Grade```: The quality classification or standard assigned to the produce.

```Min Price```: The lowest price recorded for that commodity at the specific market on that date, typically expressed in Rs./Quintal.

```Max Price```: The highest price recorded for that commodity at the specific market on that date, typically expressed in Rs./Quintal.

```Modal Price```: The most frequently occurring price for the commodity in that market on the given day; this is generally the most important price point for farmers and traders.

```Price Unit```: The unit of measurement for the price (e.g., Rs./Quintal).

```Arrival Quantity```: The total volume or amount of the commodity that reached the market on that date.

```Arrival Unit```: The unit of measurement for the arrival quantity (e.g., Metric Tonnes).

```Arrival Date```: The specific date on which the price and arrival data were recorded.

First we fetched price and arrival from Agmarknet website: [LINK](https://www.agmarknet.gov.in/daily-price-and-arrival-report)


Note: The arrival_quantity and arrival_unit will be available only on Agmarknet website. 
For the daily market prices we prefer to fetch from: [LINK](https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi)