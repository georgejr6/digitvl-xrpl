from django.contrib.humanize.templatetags import humanize
from rest_framework import serializers

from .models import Blogs


class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blogs
        fields = ['id', 'get_slug', 'blog_title', 'blog_body', 'blog_image', 'embedded_video_url',
                  'username', 'get_created_at']
