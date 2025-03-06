from django.shortcuts import render

from django.core.mail import send_mail

#api views
from rest_framework import generics , mixins 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


from rest_framework import permissions
#serializers 
from .serializers import NoteSerializer , userInfoSerializer , UserCreateSerializer ,EmailLoginSerializer,CategorySerializer  , NotificationSerializer

#models 
from .models import Note , userInfo ,Category  ,Notification

from rest_framework.response import Response

def home(request):
    return render(request, 'home.html')

class NoteView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView,
    ):
    """
    Example to a JSOn format 
    {
        "user": null,
        "title": "",
        "content": "",
        "image": null,
        "file": null,
        "color": "",
        "is_pinned": false,
        "is_archived": false,
        "category": null
     }
    """
    model = Note
    serializer_class = NoteSerializer
    
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        return Note.objects.filter(user=user)  # Filter notes by the user

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id  
        return super().create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Note deleted successfully"}, status=204)

NoteViewtoUrl = NoteView.as_view()

class userinfoView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
    ):
    """
    Example to a JSOn format
    {
        "user": null,
        "bio": "",
        "profile_picture": null
    }
    """
    serializer_class = userInfoSerializer
    lookup_field = "pk"
    queryset = userInfo.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().create(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Note deleted successfully"}, status=204)

userinfoViewtoUrl = userinfoView.as_view()



class UserCreateView(generics.CreateAPIView):
    """
    Example to a JSOn format
    {
        "username": "",
        "email": "",
        "password": "",
        "first_name": "",
        "last_name": ""
    }
    """
    serializer_class = UserCreateSerializer

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
UserCreateViewtoUrl = UserCreateView.as_view()
class EmailLoginView(APIView):
    def post(self, request):
        serializer = EmailLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })
        return Response(serializer.errors, status=400)
class CategoryView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView,
):
    """
    Example to a JSOn format
    {
        "user": null,
        "name": "",
    }
    """
    serializer_class = CategorySerializer
    
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        return Category.objects.filter(user=user)  # Filter notes by the user

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id  
        return super().create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Category deleted successfully"}, status=204)

CategoryViewURL = CategoryView.as_view()

class NotificationView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
    ):
    """
    Example to a JSOn format
    ...
    """
    serializer_class = NotificationSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        return Notification.objects.filter(user=user)  # Filter share notes by the user

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:  
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Notification deleted successfully"}, status=204)
NotificationViewURL = NotificationView.as_view()
