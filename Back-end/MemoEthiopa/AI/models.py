import uuid
from notes.models import  Note  
from django.contrib.auth.models import User
from django.db import models


class ChatSession(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User,null=True, blank=True, related_name="session", on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    linked_note = models.ForeignKey(Note, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"ChatSession {self.uuid} for {self.user.username if self.user else 'Anonymous'}"

class ChatMessage(models.Model):
    session = models.ForeignKey(ChatSession, related_name="messages", on_delete=models.CASCADE)
    sender = models.CharField(max_length=20, choices=[("user", "User"), ("ai", "AI")])
    message = models.TextField()
    token_count = models.IntegerField(null=True, blank=True)  # Optional field to store token count
    timestamp = models.DateTimeField(auto_now_add=True)
    tool_used = models.CharField(max_length=100, null=True, blank=True)  

    def __str__(self):
        return f"{self.sender} at {self.timestamp}: {self.message[:20]}..."

