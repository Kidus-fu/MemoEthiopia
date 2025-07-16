from rest_framework import serializers
from .models import BlogPost, Comment,Category
from django.utils.text import slugify


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at','is_edited','post']
    def get_user(self, obj):
        user_info = obj.user  # userInfo
        user = user_info.user  # Django User
        user_infos = {
            "email": user.email if user else None,
            "id": user.id if user else None,
            "plan": user_info.paln if user_info and hasattr(user_info, 'paln') and user_info.paln else "Free",
            "profile_picture": user_info.profile_picture.url if user_info and user_info.profile_picture else None,
            "username": user.username if user else None,
            "uuid": user_info.uuid if user_info and hasattr(user_info, 'uuid') and user_info.uuid else "No UUID",
        }
        return user_infos


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
    
class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)  
    categories = serializers.SerializerMethodField()
    category_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'photo', 'description', 'created_at', 'updated_at', 'comments','categories', 'category_ids']
        read_only_fields = ['slug', 'created_at', 'updated_at','categories']

    def create(self, validated_data):
        category_ids = validated_data.pop('category_ids', [])
        title = validated_data.get('title')
        validated_data['slug'] = slugify(title)

        instance = super().create(validated_data)

        if category_ids:
            categories = Category.objects.filter(id__in=category_ids)
            instance.categories.set(categories)

        return instance

    def update(self, instance, validated_data):
        category_ids = validated_data.pop('category_ids', None)
        title = validated_data.get('title', instance.title)
        validated_data['slug'] = slugify(title)

        instance = super().update(instance, validated_data)

        if category_ids is not None:
            categories = Category.objects.filter(id__in=category_ids)
            instance.categories.set(categories)

        return instance
    
    def get_categories(self, obj):
        return [
            {
                "id": category.id,
                "title": category.title,
                "slug": category.slug
            }
            for category in obj.categories.all()
        ]

