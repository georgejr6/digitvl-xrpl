from django.contrib.humanize.templatetags import humanize
from rest_framework import serializers

from tweets.models import Tweets


class TweetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweets
        fields = ['id', 'tweet', 'get_created_at']
