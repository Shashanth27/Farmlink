# Backend Code files

This folder contains all the Python source files used in the **Mandi Mitra** project. These scripts implement the complete pipeline for data collection, processing, decision making, and AI-based farmer advisory generation.

## Files

- **agmarknet_api.py** – Fetches live mandi price data from the AGMARKNET (data.gov.in) API, synchronizes it with the local SQLite database, and retrieves historical price data.

- **weather_api.py** – Retrieves 5-day weather forecast data from the OpenWeather API.

- **finalize.py** – Combines market prices, weather forecasts, and crop knowledge to generate structured summaries, applies the rule-based decision engine, and prepares the payload for the language model.

- **model.py** – Interfaces with the locally hosted Gemma model (via Ollama) to generate concise farmer advisories in the selected regional language based on the processed data.

- **gemma_model.ipynb** – Jupyter notebook used for experimenting with and testing the Gemma model during development.

- **crop_knowledge_base.json** – Stores crop-specific knowledge, including optimal growing conditions, storage information, grading standards, perishability, and advisory rules used by the decision engine.

## Purpose

Together, these files implement the core functionality of the Mandi Mitra system, including:

- Fetching real-time mandi prices
- Retrieving weather forecasts
- Applying crop-specific decision rules
- Preparing AI prompts
- Generating multilingual farmer advisories