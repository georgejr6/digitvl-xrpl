from djstripe.models import Subscription
from rest_framework import serializers

from .models import Membership, UserMembership, UserSubscription


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['id', 'membership_type', 'price', 'storage_size']


# class UserMembershipSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserMembership
#         e

class UserMembershipSerializer(serializers.ModelSerializer):
    membership = MembershipSerializer(read_only=True)

    class Meta:
        model = UserMembership
        fields = ['id', 'user', 'membership', 'volume_remaining', 'customer']


class StripeSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'


class UserSubscriptionSerializer(serializers.ModelSerializer):
    user_membership = UserMembershipSerializer(read_only=True)
    subscription = StripeSubscriptionSerializer(read_only=True)

    class Meta:
        model = UserSubscription
        fields = ['id', 'user_membership', 'subscription', 'get_created_date', 'get_next_billing_date']
