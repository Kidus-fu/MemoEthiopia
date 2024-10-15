from django.shortcuts import render

#api views
from rest_framework import generics , mixins 
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
#serializers 
from .serializers import NoteSerializer , userInfoSerializer , UserCreateSerializer

#models 
from .models import Note , userInfo



class NoteView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
    ):
    model = Note
    serializer_class = NoteSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        return Note.objects.filter(user=user)  # Filter notes by the user

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id  # Set the user to the authenticated user
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

NoteViewtoUrl = NoteView.as_view()

class userinfoView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
    ):
    model = userInfo
    serializer_class = userInfoSerializer
    lookup_field = "pk"

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

userinfoViewtoUrl = userinfoView.as_view()

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
UserCreateViewtoUrl = UserCreateView.as_view()

class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny] 
LoginViewtoUrl = LoginView.as_view()