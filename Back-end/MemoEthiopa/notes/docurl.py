from django.urls import path, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title="Your API Documentation",
        default_version='v1',
        description="NoteMaster Ethiopia is a full-stack note-taking application designed to help users easily create, manage, and organize their notes. Built with Django for the backend and React for the frontend, this app emphasizes simplicity and efficiency while supporting both Amharic and English languages.",
    ),
    public=True,
    permission_classes=[AllowAny],
)


urlpatterns = [
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='redoc-ui'),
]
