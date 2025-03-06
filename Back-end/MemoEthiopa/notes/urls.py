from django.urls import path , include
from .views import  NoteViewtoUrl, UserCreateViewtoUrl, userinfoViewtoUrl ,EmailLoginView,CategoryViewURL ,SharedNoteViewURL,NotificationViewURL
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    
    path("email/token/",EmailLoginView.as_view(), name='email_login'),
    path("username/token/",TokenObtainPairView.as_view(), name='email_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("notes/", NoteViewtoUrl, name="note-list"),
    path("notes/<int:pk>/",NoteViewtoUrl, name="note-detail"),
    path("register/", UserCreateViewtoUrl, name="register"),
    path("users/", userinfoViewtoUrl, name="userinfo"),
    path("users/<int:pk>/", userinfoViewtoUrl, name="userinfo-detail"),
    path("categories/", CategoryViewURL, name="category-list"),
    path("categories/<int:pk>/", CategoryViewURL, name="category-detail"),
    path("otp/",include("otp_auth.urls")),
    path("shared-note/",SharedNoteViewURL,name="shared-note"),
    path("notification/",NotificationViewURL,name="Notification"),
]
