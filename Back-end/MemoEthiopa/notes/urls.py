from django.urls import path

#views
from .views import LoginViewtoUrl , NoteViewtoUrl ,UserCreateViewtoUrl ,userinfoViewtoUrl

urlpatterns = [
    path("login/",LoginViewtoUrl , name="login"),
    path("notes/",NoteViewtoUrl , name="notes"),
    path("register/",UserCreateViewtoUrl,name="register"),
    path("userinfo/",userinfoViewtoUrl,name="userinfo")

]