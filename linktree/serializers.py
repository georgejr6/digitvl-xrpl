from rest_framework import serializers

from linktree.models import LinkTree


class LinkTreeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    artist = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = LinkTree
        fields = ['id', 'artist', 'title', 'url']


class DataSerialzier(serializers.Serializer):
    data = serializers.ListField()
