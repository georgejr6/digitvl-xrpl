from rest_framework import serializers
from linktree.models import LinkTree
from accounts.serializers import ChildFullUserSerializer


class LinkTreeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    artist = ChildFullUserSerializer(read_only=True)

    class Meta:
        model = LinkTree
        fields = ['id', 'artist', 'title', 'url']


class DataSerialzier(serializers.Serializer):
    data = serializers.ListField()
