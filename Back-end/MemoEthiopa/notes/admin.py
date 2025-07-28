from django.contrib import admin

from .models import Note,userInfo ,Category,SharedNote,Folder,Notification,Favorite,TrashNote,Setting

admin.site.register(Note)
admin.site.register(userInfo)
admin.site.register(Category)
admin.site.register(SharedNote)
admin.site.register(Folder)
admin.site.register(Notification)
admin.site.register(Favorite)
admin.site.register(TrashNote)
admin.site.register(Setting)