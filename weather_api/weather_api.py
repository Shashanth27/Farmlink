import requests
import os

WEATHER_API_KEY= os.getenv("WEATHER_API_KEY")

def fetch_weather_data(latitude, longitude, api_key=WEATHER_API_KEY):
    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        "lat": latitude,
        "lon": longitude,
        "appid": api_key,
        "units": "metric"
    }
    response = requests.get(url, params=params)
    return response.json()