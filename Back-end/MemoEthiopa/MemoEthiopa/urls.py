from django.contrib import admin
from django.urls import path , include 

#media format
from django.conf import settings
from django.conf.urls.static import static
from notes.views import home


urlpatterns = [
    path("",home,name="home"),
    path('admin/', admin.site.urls),
    path("api-v1/",include("notes.urls")),
    path("Docs/",include("notes.docurl")),
    path("memoai/",include("AI.url")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
