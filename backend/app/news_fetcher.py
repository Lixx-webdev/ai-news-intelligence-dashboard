import requests
from app.config import NEWS_API_KEY

BASE_URL = "https://newsdata.io/api/1/news"

def fetch_news():

    params = {
        "apikey": NEWS_API_KEY,
        "language": "en",
        "category": "technology"
    }

    response = requests.get(BASE_URL, params=params)

    data = response.json()

    return data