from django.urls import path
from .views import MemoChatURL

urlpatterns = [
    path("otcb/", MemoChatURL, name="memo-chat"),
]