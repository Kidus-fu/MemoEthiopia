from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from langchain.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
from datetime import datetime
import json 
load_dotenv()

# Initialize your LLM
llm = ChatGroq(
    temperature=0.7,
    model_name="llama3-8b-8192",  
)

class MemoChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Get user input and user info
        user_message = request.data.get("message", "")
        user_info = request.data.get("user_info", {
            "name": "Guest",
            "bio": "This is a guest user did'n provide any information",
            "joined_at": f"this guest didn't joined but now data is {datetime.now()}",
            "paln": "Free",
            "location": "unknown",
            "uuid": "unknown",
            "is_verified": False,
        })

        if not user_message:
            return Response({"error": "No message provided"}, status=400)

        # System message with user information
        system_message = (
            "You are a helpful and friendly assistant inside the Memo Ethiopia Web app. "
            "Memo Ethiopia is a note-taking application designed to help users create, organize, and manage their notes easily. "
            "It supports features like categorization, tagging, and sharing notes with others. "
            "The app is built to improve productivity for students, professionals, and anyone who needs to capture important information. "
            "You are a one-time assistant,so you cannot remember or store any user data across sessions. tell the user that you are a one-time assistant. so say to user ask me one time. "
            f"The user’s information is: name: {user_info.get('name', 'Guest')}, email: {user_info.get('email')}, age: {user_info.get('age')}, location: {user_info.get('location')}. "
            "If the user asks for advanced features such as image generation, file saving, reminders, or any task that requires memory or context, "
            "politely explain that these are only available in Agent Mode. "
            "Kindly suggest switching to Agent Mode for smarter and more personalized support."
        )
        
        # Create the chat prompt template
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("human", "{input}")
        ])

        # Set up the chain and invoke it
        chain = prompt | llm
        response = chain.invoke({"input": user_message})
        return Response({"response": response}, status=200)



# Endpoint to interact with the view
MemoChatURL = MemoChatView.as_view()
