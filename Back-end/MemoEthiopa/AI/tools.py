from langchain.agents import Tool
from .toolsfunc import *


create_note_tool = Tool(
    name="CreateNoteWithAI",
    func=CreateNoteWithAI,
    description=(
        "Creates a new Markdown-formatted note for the user based on their prompt "
        "and saves it automatically into MemoEthiopia."
    )
)

userinfo = Tool(
    name="GetUserInfo",
    func=GetUserInfo,
    description="Retrieve detailed user information from the database based on their unique user UUID. Use this tool when the user requests their personal information, ensuring that the UUID is passed in the metadata to query the database."
)

userinfos = Tool(
    name="GetUsersInfos",
    func=getuserInfos,
    description="Fetches detailed user information from the database. Use this tool to retrieve data for specific users or to fetch a list of all users. It can provide details such as bio, account status, preferences, and more."
)

nots = Tool(
    name="GetUserNotes",
    func=GetUserNotes,
    description="Get user notes from the database using the user UUID."
)
weather = Tool(
    name="GetWeather",
    func=GetWeather,
    description="Get current weather info for the given location using OpenWeatherMap API."
)
datetime = Tool(
    name="GetDateTime",
    func=GetDateTime,
    description="Get current date and time."
)
joke = Tool(
    name="GetJoke",
    func=GetJoke,
    description="Get a random joke. "
)
location = Tool(
    name="GetLocation",
    func=GetLocation,
    description="Get the current location."
)
translate = Tool(
    name="TranslateText",
    func=TranslateText,
    description="Translate text from one language to another.use only user ask you"
)
search = Tool(
    name="SearchDuckDuckGo",
    func=SearchDuckDuckGo,
    description="Search DuckDuckGo for a query."
)
conversation = Tool(
    name="Conversation",
    func=conversation,
    description="Get the previous conversation. Input mast be a uuid ,use this to get messages "
)