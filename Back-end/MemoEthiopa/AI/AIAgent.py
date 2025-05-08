from langchain_groq import ChatGroq
from langchain.agents import initialize_agent, AgentExecutor
from langchain.agents.agent_types import AgentType
from .tools import *
from dotenv import load_dotenv
import os


load_dotenv()

# LLM setup
llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama3-8b-8192",
    streaming=True
)

tools = [
    userinfo,
    conversation,
    userinfos,
    nots,
    weather,
    datetime,
    translate,
    search
]
agent_executor = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    verbose=False,
    max_iterations=5,
    handle_parsing_errors=True,
    
)

