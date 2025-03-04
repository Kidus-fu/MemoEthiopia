from rest_framework import serializers
from django.contrib.auth.models import User
#Models 
from django.contrib.auth import authenticate
from .models import userInfo,Note,Category
from rest_framework.reverse import reverse

class NoteSerializer(serializers.ModelSerializer):
    absolute_url = serializers.SerializerMethodField()
    class Meta:
        model = Note # serializers take model
        fields = ['id','user','title','content','image','file','created_at','updated_at','absolute_url','color','is_pinned','is_archived','category'] # make fields all coulem
    def get_absolute_url(self, obj):
        return obj.get_absolute_url()
class userInfoSerializer(serializers.ModelSerializer):
    usermore = serializers.SerializerMethodField()
    class Meta:
        model = userInfo # serializers take model 
        fields = '__all__' # make fields all coulem
    def get_usermore(self, obj):
        return {
            "username": obj.user.username,
            "email": obj.user.email,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
        }
class UserCreateSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
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
    class Meta:
        model = Category
        fields = ["id", "user", "name", "created_at"]