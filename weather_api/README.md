# Weather API Module

This folder contains the weather data retrieval component of the **Mandi Mitra** project.

## File

- **weather_api.py** – Connects to the OpenWeather Forecast API and fetches a 5-day weather forecast for a given latitude and longitude. The returned forecast data is used by the rule engine to assess weather-related risks such as high temperature, low temperature, and rainfall, enabling more accurate crop advisory recommendations.

## Purpose

This module is responsible for:
- Fetching 5-day weather forecast data from OpenWeather.
- Returning weather information in JSON format.
- Providing forecast data for downstream market analysis and rule-based decision making.
