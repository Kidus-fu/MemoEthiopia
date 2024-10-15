from django.db import models
from django.contrib.auth.models import User

class userInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Links user profile to Django's built-in User model
    username = models.CharField(max_length=200)
    bio = models.TextField(blank=True, null=True)  # Optional field for user biography
    profile_picture = models.ImageField(blank=True, null=True, upload_to='profile_pictures/')  # Optional profile picture

    def __str__(self):
        return self.user.username  # Display username for easy identification

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Links each note to a specific user
    title = models.CharField(max_length=255)  # Title of the note
    content = models.TextField()  # Main content of the note
    image = models.ImageField(blank=True, null=True, upload_to="notesImg/")  # Optional image for the note
    files = models.FileField(blank=True, null=True, upload_to="notesFiles/")  # Optional files related to the note
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the note is created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when the note is last updated

    def __str__(self):
        return self.title  # Display note title for identification
