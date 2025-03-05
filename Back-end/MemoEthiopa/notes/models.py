from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class userInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Links user profile to Django's built-in User model
    bio = models.TextField(blank=True, null=True)  # Optional field for user biography
    profile_picture = models.ImageField(blank=True, null=True, upload_to='profile_pictures/')  # Optional profile pictur
    paln = models.CharField(max_length=100,default="Free")
    joined_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    class Meta:
        verbose_name = "User Information"
        verbose_name_plural = "User Information"
     

    def __str__(self):
        return self.user.username  # Display username for easy identification

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
    image = models.ImageField(upload_to="notes_images/", blank=True, null=True)
    file = models.FileField(upload_to="notes_files/", blank=True, null=True)
    is_pinned = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    color = models.CharField(max_length=20, default="#B64526")  # Optional note color
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.user.username}"
    def get_absolute_url(self):
        URL = f"https://memoethiopia.onrender.com/api-v1/notes/{self.id}/"
        return URL

# Shared Notes Model (Optional, for collaboration)
class SharedNote(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE , related_name="shared_user")
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="shared_with")
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shared_notes")
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

