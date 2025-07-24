from django.urls import path
from .views import MemoChatURL, ChatSessionURL, ChatMessageURL
from .AIAgentView import LangChainAgentView,CreateNoteAgentView
urlpatterns = [
    path("otcb/", MemoChatURL, name="memo-chat"),
    path("chat-session/", ChatSessionURL, name="chat-session"),
    path("chat-message/", ChatMessageURL, name="chat-message"), 
    path("chat-message/<int:pk>/", ChatMessageURL, name="chat-message-detail"),
    path("chat-session/<uuid:uuid>/", ChatSessionURL, name="chat-session-detail"),
    path("agent/", LangChainAgentView.as_view(), name="langchain-agent"),
    path("noteagent/", CreateNoteAgentView.as_view(), name="langchain-agent"),
]