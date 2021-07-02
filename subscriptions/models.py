from datetime import datetime

import djstripe
import stripe
import logging
from django.db import models, transaction
from django.conf import settings
from django.db.models.signals import post_save

# Create your models here.
from django.shortcuts import get_object_or_404
from djstripe.models import Customer, Subscription

from accounts.models import User

# Get an instance of a logger
logger = logging.getLogger(__name__)

MEMBERSHIP_CHOICES = (
    ('Standard', 'standard'),
    ('Free', 'free')
)


class Membership(models.Model):
    slug = models.SlugField()
    membership_type = models.CharField(
        choices=MEMBERSHIP_CHOICES,
        default='Free',
        max_length=30)
    price = models.IntegerField(default=0.0)
    # 10800
    storage_size = models.IntegerField(default=10800)

    stripe_plan_id = models.CharField(max_length=40, null=True, blank=True)

    def __str__(self):
        return self.membership_type


class UserMembership(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='membership_plan', on_delete=models.CASCADE)
    membership = models.ForeignKey(Membership, on_delete=models.SET_NULL, null=True)
    volume_remaining = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.user.username


def post_save_user_membership_create(sender, instance, created, *args, **kwargs):
    try:
        stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
        with transaction.atomic():
            user_membership, created = UserMembership.objects.get_or_create(user=instance)
            if created:
                free_membership = get_object_or_404(Membership, membership_type='Free')
                user_membership.membership = free_membership
                user_membership.volume_remaining = free_membership.storage_size

                # create stripe customer
                stripe_customer = stripe.Customer.create(
                    email=user_membership.user.email
                )

                djstripe_customer = djstripe.models.Customer.sync_from_stripe_data(stripe_customer)

                user_membership.customer = djstripe_customer

                stripe_subscription = stripe.Subscription.create(
                    customer=stripe_customer["id"],
                    items=[{'price': 'price_1J58GBI4e8u2GP8qTZSw4HSi'}],

                )

                # sync data with subscription dj stripe
                djstripe_subscription = djstripe.models.Subscription.sync_from_stripe_data(stripe_subscription)

                subscription_data = djstripe_subscription
                subscription = UserSubscription.objects.create(
                    user_membership=user_membership,
                    stripe_subscription_id=stripe_subscription["id"],
                    subscription=subscription_data

                )
                subscription.save()
                user_membership.save()
                print("done")
    except Exception as e:
        logger.error(e)


post_save.connect(post_save_user_membership_create, sender=settings.AUTH_USER_MODEL,
                  dispatch_uid="subscriptions.models.post_save_user_membership_create")


class UserSubscription(models.Model):
    user_membership = models.ForeignKey(UserMembership, on_delete=models.CASCADE)
    stripe_subscription_id = models.CharField(max_length=40, null=True, blank=True)
    subscription = models.ForeignKey(Subscription, null=True, blank=True, on_delete=models.SET_NULL)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.user_membership.user.username

    @property
    def get_created_date(self):
        return self.subscription.created

    @property
    def get_next_billing_date(self):
        return self.subscription.current_period_end
