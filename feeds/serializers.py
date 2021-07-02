from notifications.models import Notification
from rest_framework import serializers
from django.contrib.humanize.templatetags import humanize

from accounts.models import User
from accounts.serializers import ChildFullUserSerializer
from beats.models import Songs, Comment
from beats.serializers import ChildSongSerializer, CommentsSerializer
from tweets.models import Tweets
from tweets.serializers import TweetsSerializer
from .models import Action


class ActivityObjectRelatedField(serializers.RelatedField):

    def _get_request(self):
        try:
            return self.context['request']
        except KeyError:
            raise AttributeError('GenericRelatedField have to be initialized with `request` in context')

    def to_representation(self, value):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(value, Songs):
            serializer = ChildSongSerializer(value, context=self.context)

        elif isinstance(value, User):
            serializer = ChildFullUserSerializer(value, context=self.context)
        elif isinstance(value, Tweets):
            serializer = TweetsSerializer(value, context=self.context)
        elif isinstance(value, Comment):
            serializer = CommentsSerializer(value, context=self.context)
        else:
            raise Exception('Unexpected type of tagged object')

        return serializer.data


class FeedsSerializer(serializers.ModelSerializer):
    user = ChildFullUserSerializer(read_only=True)
    target = ActivityObjectRelatedField(read_only=True)

    class Meta:
        model = Action
        fields = ['id', 'user', 'verb', 'verb_id', 'target', 'get_created']


class NotificationSerializer(serializers.ModelSerializer):
    actor = ChildFullUserSerializer(User, read_only=True)
    target = ActivityObjectRelatedField(read_only=True)
    timestamp = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'actor', 'verb', 'target', 'timestamp']

    def get_timestamp(self, obj):
        return humanize.naturaltime(obj.timestamp)


class FeaturedSongSerializer(serializers.ModelSerializer):
    user = ChildFullUserSerializer(read_only=True)
    target = ActivityObjectRelatedField(read_only=True)

    class Meta:
        model = Action
        fields = ['id', 'user', 'verb', 'verb_id', 'target']
