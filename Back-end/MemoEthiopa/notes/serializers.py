from rest_framework import serializers
from django.contrib.auth.models import User
#Models 
from django.contrib.auth import authenticate
from .models import userInfo,Note,Category,SharedNote,Notification,Favorite,TrashNote,Folder
from rest_framework.reverse import reverse
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.validators import UniqueValidator
import re
from .models import User



class AiChatSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)
    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message cannot be empty.")
        return value

class NoteSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    absolute_url = serializers.SerializerMethodField()
    folder = serializers.SerializerMethodField()
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
    def get_folder(self,obj):
        return obj.folderGet()
    def get_user_info(self, obj):
        username = obj.user.username
        id = obj.user.id
        email = obj.user.email
        user_info = getattr(obj.user, 'userInfo', None)  # Get userInfo object safely
        user_data = {
                "bio": user_info.bio if user_info and user_info.bio else "No bio available",
                "email": email,
                "id": id,
                "paln": user_info.paln if user_info and user_info.paln else "Free",
                "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
                "username": username,
                "uuid": user_info.uuid if user_info and user_info.uuid else "Not Loger Have UUID",
                "phone_number": user_info.phone_number if user_info and user_info.phone_number else "Not Provided",
                "location": user_info.location if user_info and user_info.location else "Unknown",
                "date_of_birth": user_info.date_of_birth.isoformat() if user_info and user_info.date_of_birth else "Not Set",
                "gender": user_info.gender if user_info and user_info.gender else "Not Specified",
                "social_links": user_info.social_links if user_info and user_info.social_links else [],
                "preferred_language": user_info.preferred_language if user_info and user_info.preferred_language else "en"
            }

        return user_data
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
    is_superuser = serializers.SerializerMethodField()
    class Meta:
        model = userInfo # serializers take model 
        fields = [
            "bio",
            "is_superuser",
            "id",
            "is_verified",
            "joined_at",
            "paln",
            "profile_picture",
            "user",
            "usermore",
            "uuid",
            "phone_number",
            "location",
            "date_of_birth",
            "gender",
            "social_links",
            "preferred_language"
        ]
    def get_is_superuser(self,obj):
        return obj.is_superuser()
    def get_usermore(self, obj):
        return {
            "email": obj.user.email,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
            "username": obj.user.username,
        }
class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Email already exists.")
        ]
    )

    username = serializers.CharField(
        required=True,
        min_length=4,
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Username already taken.")
        ]
    )

    first_name = serializers.CharField(
        required=True,
        min_length=2,
        max_length=50,
        error_messages={
            "required": "First name is required.",
            "min_length": "First name must be at least 2 characters.",
            "max_length": "First name must be less than 50 characters.",
        }
    )

    last_name = serializers.CharField(
        required=True,
        min_length=2,
        max_length=50,
        error_messages={
            "required": "Last name is required.",
            "min_length": "Last name must be at least 2 characters.",
            "max_length": "Last name must be less than 50 characters.",
        }
    )

    password = serializers.CharField(
        write_only=True,
        error_messages={
            "required": "Password is required.",
        }
    )

    class Meta:
        model = User
        fields = ["email", "username", "first_name", "last_name", "password"]

    def validate_first_name(self, value):
        if not re.match(r'^[\w\u1200-\u137F\u1380-\u139F\u2D80-\u2DDF]+$', value):
            raise serializers.ValidationError("First name must contain only letters.")
        return value

    def validate_last_name(self, value):
        if not re.match(r'^[\w\u1200-\u137F\u1380-\u139F\u2D80-\u2DDF]+$', value):
            raise serializers.ValidationError("Last name must contain only letters.")
        return value

    def validate(self, data):
        try:
            validate_password(data["password"])
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": e.messages})
        return data

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.full_clean()  # extra layer of safety
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
        user_data = {
                "bio": user_info.bio if user_info and user_info.bio else "No bio available",
                "email": email,
                "id": id,
                "paln": user_info.paln if user_info and user_info.paln else "Free",
                "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
                "username": username,
                "uuid": user_info.uuid if user_info and user_info.uuid else "Not Loger Have UUID",
                "phone_number": user_info.phone_number if user_info and user_info.phone_number else "Not Provided",
                "location": user_info.location if user_info and user_info.location else "Unknown",
                "date_of_birth": user_info.date_of_birth.isoformat() if user_info and user_info.date_of_birth else "Not Set",
                "gender": user_info.gender if user_info and user_info.gender else "Not Specified",
                "social_links": user_info.social_links if user_info and user_info.social_links else [],
                "preferred_language": user_info.preferred_language if user_info and user_info.preferred_language else "en"
            }
        return user_data

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
        user_data = {
                "bio": user_info.bio if user_info and user_info.bio else "No bio available",
                "email": email,
                "id": id,
                "paln": user_info.paln if user_info and user_info.paln else "Free",
                "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
                "username": username,
                "uuid": user_info.uuid if user_info and user_info.uuid else "Not Loger Have UUID",
                "phone_number": user_info.phone_number if user_info and user_info.phone_number else "Not Provided",
                "location": user_info.location if user_info and user_info.location else "Unknown",
                "date_of_birth": user_info.date_of_birth.isoformat() if user_info and user_info.date_of_birth else "Not Set",
                "gender": user_info.gender if user_info and user_info.gender else "Not Specified",
                "social_links": user_info.social_links if user_info and user_info.social_links else [],
                "preferred_language": user_info.preferred_language if user_info and user_info.preferred_language else "en"
            }
        return user_data

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
    name = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(queryset=Folder.objects.all(), message="Folder name is already taken.")
        ]
    )

    class Meta:
        ordering = ['-id']
        model = Folder
        fields = ["id","name","user","created_at","notes","user_info"]
    def get_notes(self, obj):
        notes = obj.notes.all().order_by('-pk')
        return NoteSerializer(notes, many=True).data
    def get_user_info(self, obj):
        username = obj.user.username
        id = obj.user.id
        email = obj.user.email
        user_info = getattr(obj.user, 'userInfo', None) 
        user_data = {
    "bio": user_info.bio if user_info and user_info.bio else "No bio available",
    "email": email,
    "id": id,
    "paln": user_info.paln if user_info and user_info.paln else "Free",
    "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
    "username": username,
    "uuid": user_info.uuid if user_info and user_info.uuid else "Not Loger Have UUID",
    "phone_number": user_info.phone_number if user_info and user_info.phone_number else "Not Provided",
    "location": user_info.location if user_info and user_info.location else "Unknown",
    "date_of_birth": user_info.date_of_birth.isoformat() if user_info and user_info.date_of_birth else "Not Set",
    "gender": user_info.gender if user_info and user_info.gender else "Not Specified",
    "social_links": user_info.social_links if user_info and user_info.social_links else [],
    "preferred_language": user_info.preferred_language if user_info and user_info.preferred_language else "en"
}
        return  user_data
    
               