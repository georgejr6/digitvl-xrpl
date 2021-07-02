from django.contrib.humanize.templatetags import humanize
from django.db import models

from accounts.models import User
from common.utils import get_unique_slug
from common.digitvl_timestamp import BaseTimestampModel


# Create your models here.
class Blogs(BaseTimestampModel):
    blog_title = models.CharField(max_length=500)
    slug = models.SlugField()
    blog_body = models.TextField()
    blog_image = models.ImageField(upload_to='blogs/%Y/%m/%d/', blank=True)
    embedded_video_url = models.URLField(blank=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "blogs"
        ordering = ('-created_at',)

    @property
    def get_slug(self):
        return self.slug

    @property
    def username(self):
        return self.added_by.username

    @property
    def get_created_at(self):
        return humanize.naturaltime(self.created_at)

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_str = f'{self.blog_title}'
            self.slug = get_unique_slug(self, slug_str, Blogs.objects)
            # if self.photo_main:

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.blog_title}'
