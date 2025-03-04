from django.contrib import admin

from .models import Note,userInfo ,Category,SharedNote

admin.site.register(Note)
admin.site.register(userInfo)
admin.site.register(Category)
admin.site.register(SharedNote)
