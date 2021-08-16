from rest_framework import serializers

from advertisement.models import Advertisement


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = ['id', 'description', 'advertisement_image', 'advertisement_url', 'approve']
