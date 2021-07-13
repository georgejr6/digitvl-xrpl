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

class StripeSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'


class UserSubscriptionSerializer(serializers.ModelSerializer):
    subscription = StripeSubscriptionSerializer(read_only=True)

    class Meta:
        model = UserSubscription
        fields = ['id', 'subscription', 'get_created_date', 'get_next_billing_date', 'subscription_badge']


class UserMembershipSerializer(serializers.ModelSerializer):
    membership = MembershipSerializer(read_only=True)
    # user_membership_subscription = UserSubscriptionSerializer(read_only=True, many=True)
    subscription_badge = serializers.SlugRelatedField(
        source='user_membership_subscription',
        slug_field='subscription_badge',
        read_only=True,
        many=True,

    )

    class Meta:
        model = UserMembership
        fields = ['id', 'user', 'membership', 'volume_remaining', 'customer',
                  'subscription_badge']
