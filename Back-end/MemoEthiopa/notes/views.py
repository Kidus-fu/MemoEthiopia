from django.shortcuts import render

from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
#api views
from rest_framework import generics , mixins 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework import permissions
#serializers 
from .serializers import NoteSerializer , userInfoSerializer , UserCreateSerializer ,EmailLoginSerializer,CategorySerializer  , NotificationSerializer, SharedNoteSerializer, ShardNoteSerializer,FavoriteSerializer,FolderSerializer,ChangePasswordSerializer 

# permission 

from .permission import IsStaffEditor

from AI.encode import encode_query_data, decode_query_data

#models 
from .models import Note, userInfo, Category, Notification, SharedNote, Favorite, Folder

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user

            # Check old password
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({"old_password": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)

            # Set new password
            user.set_password(serializer.validated_data['new_password'])
            user.save()

            return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

ChangePasswordURL = ChangePasswordView.as_view()

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
    lookup_field = "uuid"
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        finde_archived = self.request.query_params.get("is_archived")
        user = self.request.user  
        if finde_archived == "true":
            query = Note.objects.filter(user=user,is_trashed=False,is_archived=True).order_by('-pk')      
            return query
        query = Note.objects.filter(user=user,is_trashed=False,is_archived=False).order_by('-pk')  
        return query

    def get(self, request, *args, **kwargs):
        uuid = kwargs.get("uuid", None)
        if uuid is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        finde_archived = request.query_params.get("is_archived")
        if finde_archived == 'true':
            request.data['user'] = request.user.id  
            queryset = self.get_queryset()
            item_count = queryset.count()

            queryset.update(is_trashed=False)

            return Response({
                "message": f"{item_count} Archived notes have been restored successfully."
            }, status=200)
        
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

class NoteOuttoTrashView(
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
    lookup_field = "uuid"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        query = Note.objects.filter(user=user,is_trashed=True).order_by('-pk')
        return query
    def get(self, request, *args, **kwargs):
        uuid = kwargs.get("uuid", None)
        if uuid is None:  # List all notes for the authenticated user
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        restoreall = request.query_params.get("restore_all")
        request.data['user'] = request.user.id

        if restoreall == 'true':
            queryset = self.get_queryset()
            item_count = queryset.count()
            # Bulk update all matching objects
            queryset.update(is_trashed=False)

            return Response({
                "message": f"{item_count} trashed notes have been restored successfully."
            }, status=200)
        return Response({
            "message": f"Method Not Allowed"
        },status=405)
    
    def put(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        all_delete = request.query_params.get("all_delete")
        if all_delete == "true":
            queryset = self.get_queryset()
            deleted_count = queryset.count()
            queryset.delete()
            return Response(
                {"message": f"Deleted {deleted_count} trashed notes."},
                status=status.HTTP_204_NO_CONTENT
            )
        # default single delete with pk
        super().delete(request, *args, **kwargs)
        return Response({"message": "Note deleted successfully"}, status=204)
NoteOuttoTrashViewURL = NoteOuttoTrashView.as_view()
    

class GetUser(APIView):
    parser_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user.id
            user_info = userInfo.objects.get(user=user)
            serialized = userInfoSerializer(user_info)
            return Response(serialized.data, status=200)
        except userInfo.DoesNotExist:
            return Response({"error": "User info not found"}, status=404)
        

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
        .......
    }
    """
    serializer_class = userInfoSerializer
    lookup_field = "uuid"
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self,):
        user = self.request.user  # Get the currently authenticated user
        urlquery = self.request.query_params.get("query", None)
        if urlquery is not None:
            # Decode the query data
            decoded_data = decode_query_data(urlquery)
            user_id = decoded_data.get("user_id")
            
            if user_id is not None:
                # Filter by user_id if provided
                query = userInfo.objects.all().order_by('-pk')
                return query
        query = userInfo.objects.all()
        return query

    def get(self, request, *args, **kwargs):
        uuid = kwargs.get("uuid", None)
        if uuid is None:  
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        print(request.data)
        # request.data['user'] = request.user.id 
        return super().create(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "User deleted successfully"}, status=204)

userinfoViewtoUrl = userinfoView.as_view()



class UserCreateView(APIView):
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
        return Category.objects.filter(user=user).order_by('-pk')  # Filter notes by the user

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



class GetSharedNoteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, uuid):
        """Retrieve a shared note if the user has access"""
        shared_note = get_object_or_404(SharedNote, uuid=uuid, shared_with=request.user)
        serializer = ShardNoteSerializer(shared_note.note)  # Serialize the actual Note model
        return Response(serializer.data)
class GetSherdNotes(APIView):
    parser_classes = [permissions.IsAuthenticated]

    def get(self, request):
        shared_notes = SharedNote.objects.filter(shared_with=request.user)  # Get multiple objects
        serializer = SharedNoteSerializer(shared_notes, many=True)  # Serialize multiple objects
        return Response(serializer.data)
class NotificationView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
    ):
    """
    Example to a JSOn format
    ...
    """
    serializer_class = NotificationSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        return Notification.objects.filter(user=user,is_read=False).order_by('-pk')  # Filter share notes by the user

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
        request.data['user'] = request.user.id 
        return super().update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Notification deleted successfully"}, status=204)
NotificationViewURL = NotificationView.as_view()

class FavoritesView (
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
    serializer_class = FavoriteSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        return Favorite.objects.filter(user=user).order_by('-pk')  

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
        return Response({"message": "Favorites deleted successfully"}, status=204)
FavoritesURL = FavoritesView.as_view()

class TrashNoteView (
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
    serializer_class = NoteSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user
        return Note.objects.filter(user=user,is_trashed=True).order_by('-pk')  

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
        return Response({"message": "TrashNote deleted successfully"}, status=204)
TrashNoteURL = TrashNoteView.as_view()

from rest_framework import mixins, generics, permissions
from rest_framework.response import Response

class FolderView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,   # ✅ This is the missing piece
    generics.GenericAPIView
):

    serializer_class = FolderSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Folder.objects.filter(user=user).order_by('-pk')
    

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is None:
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id  
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        self.destroy(request, *args, **kwargs)
        return Response({"message": "Folder deleted successfully"}, status=204)

FolderURL = FolderView.as_view()

