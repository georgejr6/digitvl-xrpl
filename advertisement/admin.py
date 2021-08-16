from django.contrib import admin

# Register your models here.
from advertisement.models import Advertisement


class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'advertisement_image', 'advertisement_url')


admin.site.register(Advertisement, AdvertisementAdmin)