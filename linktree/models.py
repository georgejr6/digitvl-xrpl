from django.conf import settings
from django.db import models


# Create your models here.


class LinkTree(models.Model):
    artist = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='artists_url', on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    url = models.URLField()

    def __str__(self):
        return self.title
