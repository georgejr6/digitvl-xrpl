from django.contrib import admin

# Register your models here.
from .models import Songs, PlayList, Comment

admin.site.register(Songs)
admin.site.register(PlayList)
admin.site.register(Comment)