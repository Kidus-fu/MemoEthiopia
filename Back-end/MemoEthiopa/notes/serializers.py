from rest_framework import serializers
from django.contrib.auth.models import User
#Models 
from .models import userInfo,Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note # serializers take model
        fields = '__all__' # make fields all coulem
class userInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = userInfo # serializers take model 
        fields = '__all__'# make fields all coulem

class UserCreateSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password"
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
            