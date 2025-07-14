from django.urls import path , include
from .views import  NoteViewtoUrl, UserCreateViewtoUrl, userinfoViewtoUrl ,EmailLoginView,CategoryViewURL ,NotificationViewURL, GetSharedNoteView, GetSherdNotes,FavoritesURL,FolderURL,NoteOuttoTrashViewURL,ChangePasswordURL,GetUser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('shared-notes/', GetSherdNotes.as_view(), name="GetAllSharedNotes"),
    path("shared-notes/note/<uuid:uuid>/",GetSharedNoteView.as_view(), name="get-shared-notes"),
    path("email/token/",EmailLoginView.as_view(), name='email_login'),
    path("username/token/",TokenObtainPairView.as_view(), name='email_login'),
    path("change-password/",ChangePasswordURL, name="change-password"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("notes/", NoteViewtoUrl, name="note-list"),
    path("notes/<uuid:uuid>/",NoteViewtoUrl, name="note-detail"),
    path("notes/outtrash/<uuid:uuid>/",NoteOuttoTrashViewURL, name="NoteOuttoTrash"),
    path("notes/outtrash/",NoteOuttoTrashViewURL, name="NoteOuttoTrash"),
    path("register/", UserCreateViewtoUrl, name="register"),
    path("users/", userinfoViewtoUrl, name="userinfo"),
    path("users/<uuid:uuid>/", userinfoViewtoUrl, name="userinfo-detail"),
    path("userget/", GetUser.as_view(), name="userget"),
    path("categories/", CategoryViewURL, name="category-list"),
    path("categories/<int:pk>/", CategoryViewURL, name="category-detail"),
    path("otp/",include("otp_auth.urls")),
    path("notification/",NotificationViewURL,name="Notification"),
    path("notification/<int:pk>/",NotificationViewURL,name="Notification"),
    path("favorites/",FavoritesURL,name="Favorites"),
    path("favorites/<int:pk>/",FavoritesURL,name="Favorites"),
    path("folders/",FolderURL,name="Folder"),
    path("folders/<int:pk>/",FolderURL,name="Folder"),
]