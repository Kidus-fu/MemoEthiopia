import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

import uuid
from django.db import models
from django.contrib.auth.models import User

class userInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userInfo")  
    bio = models.TextField(blank=True, null=True)  
    profile_picture = models.ImageField(blank=True, null=True, upload_to='profile_pictures/')  
    paln = models.CharField(max_length=100, default="Free")
    joined_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False,unique=True)
    is_verified = models.BooleanField(blank=True, null=True, default=False)

    phone_number = models.CharField(max_length=20, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True, null=True)
    social_links = models.JSONField(blank=True, null=True)
    preferred_language = models.CharField(max_length=50, blank=True, null=True)
    class Meta:
        verbose_name = "User Information"
        verbose_name_plural = "User Information"

    def __str__(self):
        return f"{self.user.username} - {self.uuid}"

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    note = models.ForeignKey("Note", on_delete=models.CASCADE, related_name="favorites")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.note.title}"

# Category Model
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# Note Model
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="notes")
    title = models.CharField(max_length=255)
    content = models.TextField()
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image = models.ImageField(upload_to="notes_images/", blank=True, null=True)
    file = models.FileField(upload_to="notes_files/", blank=True, null=True)
    is_pinned = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    color = models.CharField(max_length=20, default="#B64526")  # Optional note color
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    folder = models.ForeignKey("Folder", on_delete=models.SET_NULL, null=True, blank=True, related_name="notes",)
    is_trashed = models.BooleanField(default=False)  # To track if the note is in trash
    def __str__(self):
        return f"{self.title} - {self.user.username}"
    def get_absolute_url(self):
        URL = f"https://memoethiopia.onrender.com/api-v1/notes/{self.id}/"
        return URL

class TrashNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="trash_notes")
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="trashed_note")
    deleted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Trashed Note: {self.note.title} - {self.user.username}"

class Folder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="folders")
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# Shared Notes Model (Optional, for collaboration)
class SharedNote(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE , related_name="shared_user")
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="shared_with")
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shared_notes")
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)    
    permission = models.CharField(
        max_length=10,
        choices=[("view", "View"), ("edit", "Edit")],
        default="view",
    )
    shared_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.note.title} shared with {self.shared_with.username}"

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")  # The user receiving the notification
    message = models.TextField()  # The notification content/message
    is_read = models.BooleanField(default=False)  # If the notification has been read or not
    created_at = models.DateTimeField(auto_now_add=True)  # When the notification was created
    updated_at = models.DateTimeField(auto_now=True)  # When the notification was last updated

    def __str__(self):
        return f"Notification for {self.user.username} - {self.message[:30]}..."  # Display first 30 characters of the message

    class Meta:
        ordering = ["-created_at"]  # Show newest notifications first

