from django.contrib import admin
from django.urls import path , include 

#media format
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/",include("notes.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
