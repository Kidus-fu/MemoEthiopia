from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, mixins
from langchain.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from datetime import datetime
from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatMessageSerializer

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


class ChatSessionView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView,):

    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer
    lookup_field = "uuid"
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)
    def get(self, request, *args, **kwargs):
        uuid = kwargs.get("uuid", None)
        if uuid is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):

        request.data['user'] = request.user.id  
        return super().create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Session was deleted successfully"}, status=204)
ChatSessionURL = ChatSessionView.as_view()
class ChatMessageView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView,
):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Chat deleted successfully"}, status=204)
ChatMessageURL = ChatMessageView.as_view()

# Endpoint to interact with the view
MemoChatURL = MemoChatView.as_view()
