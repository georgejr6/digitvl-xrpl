from djstripe.models import Subscription, Plan
from rest_framework import serializers

from .models import Membership, UserMembership, UserSubscription


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['id', 'membership_type', 'price', 'storage_size']


class StripeSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'


class StripePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'


class UserSubscriptionSerializer(serializers.ModelSerializer):
    subscription = StripeSubscriptionSerializer(read_only=True)

    class Meta:
        model = UserSubscription
        fields = ['id', 'subscription', 'get_created_date', 'get_next_billing_date', 'get_plan']


class UserMembershipSerializer(serializers.ModelSerializer):
    membership = MembershipSerializer(read_only=True)

    class Meta:
        model = UserMembership
        fields = ['id', 'membership', 'volume_remaining', 'customer', 'get_customer_id',
                  'subscription_badge']
