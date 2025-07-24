import requests 
import os
from .encode import encode_query_data
from dotenv import load_dotenv
from datetime import datetime
from duckduckgo_search import DDGS
from deep_translator import GoogleTranslator
from langchain_core.documents import Document
from notes.serializers import userInfoSerializer
from notes.models import *
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from langchain_groq import ChatGroq
import re

load_dotenv()

# Testing
endpoint = "http://localhost:8000/api-v1/"
aiendpoint = "http://localhost:8000/memoai/"
# production 
# endpoint = "https://memoethiopia.onrender.com/api-v1/"

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama3-8b-8192",
    streaming=True
)


def clean_markdown(text: str) -> str:
    """
    Removes Markdown formatting symbols like #, ##, *, **, **** from text.
    Useful for extracting clean titles or plain summaries.
    """
    # Remove headers like #, ##, ### at the start of lines
    text = re.sub(r'^#{1,6}\s*', '', text, flags=re.MULTILINE)

    # Remove bold (**text**)
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)

    # Remove italic (*text*)
    text = re.sub(r'\*(.*?)\*', r'\1', text)

    # Remove any remaining stray *
    text = text.replace('*', '')

    # Remove any remaining stray #
    text = text.replace('#', '')

    # Remove any leading/trailing whitespace
    return text.strip()

def CreateNoteWithAI(input_data: dict) -> str:
    """
    Expects:
        {
            "user_id": "<id>",
            "user_prompt": "<prompt describing the note>",
            "folder_id":'<folder_id>'
        }
    Returns:
        Markdown string of the created note.
    """
    userModel = User

    user_id = input_data.get("user_id")
    user_prompt = input_data.get("user_prompt")
    folder_id = input_data.get("folder_id")


    if not user_id or not user_prompt:
        return "Missing user_id or user_prompt."

    try:
        user = userModel.objects.get(id=user_id)
    except userModel.DoesNotExist:
        return "User not found."
    
    folder = None
    if folder_id:
        try:
            folder = Folder.objects.get(id=folder_id, user=user)
        except Folder.DoesNotExist:
            return {"error": "Folder not found or does not belong to user."}

    # Construct system prompt
    prompt = (
        f"You are an AI assistant for MemoEthiopia.\n"
        f"Create a detailed, well-structured note for the user based on this prompt:\n\n"
        f"'{user_prompt}'\n\n"
        f"Format the note in Markdown with clear headings, bullet points, and code blocks if needed. "
        f"Ensure it is clear and helps the user understand the topic easily."
    )

    response = llm.invoke(prompt)
    markdown_note = response.content
    
    # Use first line as title if possible
    first_line = markdown_note.strip().splitlines()[0].replace("#", "").strip()
    title = first_line if first_line else f"Note: {user_prompt[:50]}"
    title = clean_markdown(title)

    note = Note.objects.create(
        user=user,
        title=title,
        content=markdown_note,
        folder=folder
    )
    note.save()


    return {
        "note_uuid": str(note.uuid),
        "note_title": note.title,
        "note_content_md": markdown_note,
        "folder": folder.name if folder else None
    }



def GetUserInfo(user_uuid):
    """
    Get user information from the database using the user UUID.
    """
    user_uuid = user_uuid.strip()
    user_info = get_object_or_404(userInfo, uuid=user_uuid)
    serializer = userInfoSerializer(instance=user_info)
    if serializer.data:
        return Response(serializer.data, status=status.HTTP_200_OK)
    return "Someting went wrong"
def getuserInfos(*args,**kwargs):
    """
    Get users information from the database .
    """
    query = userInfo.objects.all()
    serializer = userInfoSerializer(instance=query,many=True)
    print(serializer.data)
    if serializer.data:
        return Response(serializer.data, status=status.HTTP_200_OK)
    return "Someting went wrong"

    
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