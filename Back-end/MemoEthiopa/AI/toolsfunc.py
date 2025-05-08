import requests 
import os
from .encode import encode_query_data
from dotenv import load_dotenv
from datetime import datetime
from duckduckgo_search import DDGS
from deep_translator import GoogleTranslator
from langchain_core.documents import Document

load_dotenv()

# Testing
endpoint = "http://localhost:8000/api-v1/"
aiendpoint = "http://localhost:8000/memoai/"
# production 
# endpoint = "https://memoethiopia.onrender.com/api-v1/"

def GetUserInfo(User_uuid):
    """
    Get user information from the database using the user UUID.
    """
    user_uuid = User_uuid.strip()

    url = f"{endpoint}users/{user_uuid}/"
    response = requests.get(url)
    if response.status_code == 200:
        data =  response.json()
        return {
            "bio": data.get("bio"),
            "id":data.get('id'),
            "is_verified": data.get("is_verified"),
            "joined_at": data.get("joined_at"),
            "paln": data.get("paln"),
            "profile_picture": data.get("profile_picture"),
            "user": data.get("user"),
            "usermore": {
                "email" :data.get("email"),
                "first_name":data.get("first_name"),
                "last_name": data.get("last_name"),
                "username" :data.get("username")
            },
            "uuid": data.get("uuid"),
            "phone_number": data.get("phone_number"),
            "location": data.get("location"),
            "date_of_birth": data.get("date_of_birth"),
            "gender": data.get("gender"),
            "social_links": data.get("social_links"),
            "preferred_language": data.get("preferred_language")
        }
    else:
        return None
def getuserInfos(*args,**kwargs):
    """
    Get users information from the database .
    """
    url = f"{endpoint}users/"
    print(url)
    response = requests.get(url)
    print(response.status_code)
    if response.status_code == 200:
        return response.json()
    else:
        return None
    
def GetUserNotes(User_name:str):
    """
    Get user notes from the database using the user UUID.
    """
    encodedata = {
        "user_name": User_name,
        "ai_agent_mode": True,
    }
    encoded_query = encode_query_data(encodedata)
    url = f"{endpoint}notes/?query={encoded_query}"
    print(url)
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def GetWeather(location: str,) -> str:
    """
    Get current weather info for the given location using OpenWeatherMap API.

    Args:
        location (str): City or location name.
        api_key (str): Your OpenWeatherMap API key.

    Returns:
        str: Weather description or error message.
    """
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        return "⚠️ Weather API key is not set."
    params = {
        "q": location,
        "appid": api_key,
        "units": "metric"
    }
    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        if response.status_code != 200 or "weather" not in data:
            return f"❌ Unable to get weather for '{location}'. Error: {data.get('message', 'Unknown error')}"

        temp = data["main"]["temp"]
        description = data["weather"][0]["description"].title()
        city = data["name"]
        country = data["sys"]["country"]

        return f"🌤 Weather in {city}, {country}: {description}, {temp}°C"

    except Exception as e:
        return f"⚠️ Error: {str(e)}"
def GetDateTime(*args,**kwargs) -> str:
    """
    Get the current date and time in a human-readable format.
    """
    now = datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S")

def GetJoke(*args,**kwargs) -> str:
    """
    Fetches a random joke from the Official Joke API.
    """
    url = "https://official-joke-api.appspot.com/random_joke"

    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200 or "setup" not in data:
            return "❌ Couldn't fetch a joke at the moment."

        setup = data["setup"]
        punchline = data["punchline"]

        return f"😂 {setup} — {punchline}"

    except Exception as e:
        return f"⚠️ Error: {str(e)}"

def GetLocation(location_name:str) -> str:
    """
    Returns a formatted location message from a user-provided country or city name.
    """
    if not location_name:
        return "⚠️ No location provided."
    
    return f"📍 Your selected location is: {location_name.strip().title()}"

def TranslateText(text, target_lang="am"):
    try:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        return f"✅ Translated: {translated}"
    except Exception as e:
        return f"❌ Error: {str(e)}"

def SearchDuckDuckGo(text: str, max_results:int = 2) -> str:
    
    """
    Search(text: str)
    Searches DuckDuckGo for the given text 
    """
    
    with DDGS() as ddgs:
        results = ddgs.text(text, max_results=max_results)
        documents = []
        for result in results:
            title = result.get("title")
            body = result.get("body")
            url = result.get("href")
            if title and body and url:
                documents.append(Document(page_content=body, metadata={"title": title, "url": url,"userpromt": text,"id":encode_query_data(text )}))
        if not documents:
            return "❌ No results found."
        return documents
#  Generate Image in future
def conversation(session_uuid):
    """
    This function is used to generate a conversation with the user.
    """
    url = f"{aiendpoint}chat-session/{session_uuid}/"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return "❌ Error: Unable to fetch conversation."