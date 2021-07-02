from rest_framework import serializers

from accounts.serializers import GetFullUserSerializer
from .models import InviteUser


class InviteUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = InviteUser
        fields = ['invited_user', ]
