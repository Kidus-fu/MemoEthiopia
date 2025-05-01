from rest_framework import serializers
from django.contrib.auth.models import User
#Models 
from django.contrib.auth import authenticate
from .models import userInfo,Note,Category,SharedNote,Notification,Favorite,TrashNote,Folder
from rest_framework.reverse import reverse
from django.contrib.auth.password_validation import validate_password





class AiChatSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)
    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message cannot be empty.")
        return value

class NoteSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    absolute_url = serializers.SerializerMethodField()
    class Meta:
        model = Note # serializers take model
        fields = [
            "absolute_url",
            "category",
            "color",
            "content",
            "created_at",
            "file",
            "folder",
            "is_trashed",
            "id",
            "image",
            "is_archived",
            "is_pinned",
            "title",
            "updated_at",
            "user_info",
            "uuid",
        ]

    def get_absolute_url(self, obj):
        return obj.get_absolute_url()
    def get_user_info(self, obj):
        username = obj.user.username
        id = obj.user.id
        email = obj.user.email
        user_info = getattr(obj.user, 'userInfo', None)  # Get userInfo object safely

        return {
            "bio": user_info.bio if user_info else "No bio available",
            "email": email,
            "id": id,
            "paln": user_info.paln if user_info.paln else "Free",
            "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
            "username": username,
            "uuid": user_info.uuid if user_info.uuid else "Not Loger Have UUID",
        }
class ShardNoteSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    class Meta:
        model = Note # serializers take model
        fields = [
            "category",
            "color",
            "content",
            "created_at",
            "file",
            "id",
            "image",
            "is_archived",
            "is_pinned",
            "title",
            "updated_at",
            "user_info",
        ]

    def get_absolute_url(self, obj):
        return obj.get_absolute_url()
    def get_user_info(self, obj):
        username = obj.user.username
        id = obj.user.id
        email = obj.user.email
        user_info = getattr(obj.user, 'userInfo', None)  # Get userInfo object safely

        return {
            "bio": user_info.bio if user_info else "No bio available",
            "email": email,
            "paln": user_info.paln if user_info.paln else "Free",
            "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
            "username": username,
        }


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class userInfoSerializer(serializers.ModelSerializer):
    usermore = serializers.SerializerMethodField()
    class Meta:
        model = userInfo # serializers take model 
        fields = [
            "bio",
            "id",
            "is_verfied",
            "joined_at",
            "paln",
            "profile_picture",
            "user",
            "usermore",
            "uuid",
        ]
    def get_usermore(self, obj):
        return {
            "email": obj.user.email,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
            "username": obj.user.username,
        }
class UserCreateSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "password",
            "username",
        ]
        extra_kwargs = {"password": {"write_only": True}} 

        def create(self, validated_data):  
            user = User(
                username=validated_data["username"],  
                email=validated_data["email"]
            )
            user.set_password(validated_data["password"])  
            user.full_clean()
            user.save()
            return user
class EmailLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["email"], password=data["password"])
        if user:
            return user
        raise serializers.ValidationError("Invalid email or password")
class CategorySerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = [
            "created_at",
            "id",
            "name",
            "user_info",
        ]
    def get_user_info(self,obj):
        username = obj.user.username
        id = obj.user.id
        email = obj.user.email
        user_info = getattr(obj.user, 'userInfo', None)  # Get userInfo object safely

        return {
            "id":id,
            "username": username,
            "email": email,
            "bio": user_info.bio if user_info else "No bio available",
            "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
            "paln": user_info.paln if user_info.paln else "Free",
            "uuid": user_info.uuid if user_info.uuid else "Not Loger Have UUID"
        }

class SharedNoteSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    shared_with_name = serializers.SerializerMethodField()
    notetitle = serializers.SerializerMethodField()
    class Meta:
        model = SharedNote
        fields = [
            "note",
            "notetitle",
            "permission",
            "shared_with_name",
            "user_name",
            "uuid",
        ]
    def get_notetitle(self,obj):
        return obj.note.title
    def get_user_name(self, obj):
        username = obj.user.username
        id = obj.user.id
        email = obj.user.email
        user_info = getattr(obj.user, 'userInfo', None)  # Get userInfo object safely

        return {
            "id":id,
            "username": username,
            "email": email,
            "bio": user_info.bio if user_info else "No bio available",
            "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
            "paln": user_info.paln if user_info.paln else "Free",
            "uuid": user_info.uuid if user_info.uuid else "Not Loger Have UUID"
        }


    
    def get_shared_with_name(self,obj):
        username = obj.shared_with.username
        id = obj.shared_with.id
        email = obj.shared_with.email
        user_info = getattr(obj.shared_with, 'userInfo', None) 
        return {
            "id":id,
            "username":username,
            "email":email,
            "bio": user_info.bio if user_info else "No bio available",
            "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
            "paln": user_info.paln if user_info.paln else "Free",
            "uuid": user_info.uuid if user_info.uuid else "Not Loger Have UUID"
            }
    
class NotificationSerializer(serializers.Serializer):
    class Meta:
        model = Notification
        fields = "__all__"

class FavoriteSerializer(serializers.ModelSerializer):
    notes = serializers.SerializerMethodField()

    class Meta:
        model = Favorite
        fields = ["id","user","notes"]
    def get_notes(self, obj):
        notes = obj.note  # Assuming obj.note is a single Note object
        return NoteSerializer(notes).data if notes else None
class TrashNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrashNote
        fields = "__all__"

class FolderSerializer(serializers.ModelSerializer):
    notes = serializers.SerializerMethodField()
    user_info = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ["id","name","user","created_at","notes","user_info"]
    def get_notes(self, obj):
        notes = obj.notes.all()
        return NoteSerializer(notes, many=True).data
    def get_user_info(self, obj):
        username = obj.user.username
        id = obj.user.id
        email = obj.user.email
        user_info = getattr(obj.user, 'userInfo', None) 
        return { 
            "id":id,
            "username":username,
            "email":email,
            "bio": user_info.bio if user_info else "No bio available",
            "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
            "paln": user_info.paln if user_info.paln else "Free",
            "uuid": user_info.uuid if user_info.uuid else "Not Loger Have UUID"
            }
    
               