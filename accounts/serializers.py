from django.contrib.auth.hashers import make_password

from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_framework.authtoken.models import Token


from rest_framework_jwt.settings import api_settings
from subscriptions.serializers import UserMembershipSerializer
from .models import User, Profile
from beats.validators import (
    FileExtensionValidator
)
from beats.utils import get_username_unique_slug


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'username_slug', 'full_name', 'avatar', 'cover_photo', 'bio', 'location',
                  'birth_date', 'blue_tick_verified', 'website_link', 'instagram_link', 'facebook_link',
                  'twitter_link', 'youtube_link', 'followers_count', 'following_count', 'track_count']


class ChildProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'username_slug', 'avatar', 'blue_tick_verified', 'followers_count',
                  'following_count',
                  'track_count']


class SecondChildProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'username_slug', 'avatar']


class ChildFullUserSerializer(serializers.ModelSerializer):
    profile = ChildProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'profile')


class GetFullUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    membership_plan = UserMembershipSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'username_slug', 'first_name', 'last_name', 'email', 'profile',
                  'membership_plan', 'is_staff')


# use this in future
# class CustomPhoneNumberField(PhoneNumberField):
#     def to_internal_value(self, data):
#         phone_number = to_python(data)
#         if phone_number and not phone_number.is_valid():
#             raise ValidationError("")
#         return phone_number.as_e164


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    profile = ProfileSerializer(read_only=True)
    membership_plan = UserMembershipSerializer(read_only=True)
    phone_number = PhoneNumberField()

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    class Meta:
        model = User
        fields = (
            'token', 'id', 'username', 'username_slug', 'first_name', 'last_name', 'phone_number', 'email', 'password',
            'profile',
            'membership_plan')
        extra_kwargs = {'password': {'write_only': True}}

    # def validate_password(self, value: str) -> str:
    #     return make_password(value)

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        token = Token.objects.create(user_id=user.id)
        user.email_verification_token = token.key
        user.save()
        return user


class UpdateProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=True, validators=[FileExtensionValidator('image')])
    cover_photo = serializers.ImageField(required=True, validators=[FileExtensionValidator('image')])
    user = GetFullUserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'location', 'birth_date', 'cover_photo', 'avatar', 'website_link', 'instagram_link',
                  'facebook_link',
                  'twitter_link', 'youtube_link']


# Email Verification Code
class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    full_name = serializers.CharField(read_only=True)


class ResetPasswordSerializer(serializers.Serializer):
    code = serializers.CharField(required=True, write_only=True, allow_blank=True)
    email = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)


# send email to users about important notification.
class Important_Notification(serializers.Serializer):
    body = serializers.CharField(max_length=999)
