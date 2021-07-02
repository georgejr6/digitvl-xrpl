# """
#  task to register user on stripe side
# """
# import djstripe
# import stripe
# from celery import shared_task, Celery
#
# from accounts.models import User
# from celery.contrib import rdb
#
# app = Celery()
#
#
# # @shared_task
# # def register_user_on_stripe():
# #     stripe.api_key = djstripe.settings.STRIPE_SECRET_KEY
# #     user_email = User.objects.all()
# #     for user in user_email:
# #         free_trial_pricing = Membership.objects.get(membership_type='Free')
# #         user = get_object_or_404(User, email=user.email)
# #
# #         # user_membership = UserMembership.objects.create(
# #         #     user=user,
# #         #     membership=free_trial_pricing,
# #         # )
# #         # subscription = Subscription.objects.create(
# #         #     user_membership=user_membership,
# #         #     pricing=free_trial_pricing
# #         # )
# #         stripe_customer = stripe.Customer.create(
# #             email=user.email
# #         )
# #         stripe_subscription = stripe.Subscription.create(
# #             customer=stripe_customer["id"],
# #             items=[{'price': 'price_1J58GBI4e8u2GP8qTZSw4HSi'}],
# #
# #         )
# #         # subscription.active = stripe_subscription["status"]
# #         # subscription.stripe_subscription_id = stripe_subscription["id"]
# #         # subscription.save()
# #         # user.stripe_customer_id = stripe_customer["id"]
# #         # user.save()
#
#
# @shared_task
# def single_register_user_on_stripe(email):
#     stripe.api_key = djstripe.settings.STRIPE_SECRET_KEY
#     user = User.objects.get(email=email)
#
#     # create stripe customer
#     stripe_customer = stripe.Customer.create(
#         email=user.email
#     )
#     print(stripe_customer)
#     # rdb.set_trace(stripe_customer)
#     # data = stripe.Customer.retrieve(id=stripe_customer['id'])
#     # if data['email'] == email:
#     #     return None
#     #
#     # else:
#     # sync data with dj-stripe
#     djstripe_customer = djstripe.models.Customer.sync_from_stripe_data(stripe_customer)
#
#     print(djstripe_customer)
#     # rdb.set_trace()
#     user.customer = djstripe_customer
#
#     stripe_subscription = stripe.Subscription.create(
#         customer=stripe_customer["id"],
#         items=[{'price': 'price_1J58GBI4e8u2GP8qTZSw4HSi'}],
#
#     )
#
#     # sync data with subscription dj stripe
#     djstripe_subscription = djstripe.models.Subscription.sync_from_stripe_data(stripe_subscription)
#
#     # user.subscription = djstripe_subscription
#     # subscription = UserSubscription.objects.create(
#     #     user_membership=user_membership,
#     #     active=stripe_subscription["status"],
#     #     stripe_subscription_id=stripe_subscription["id"]
#     #
#     # )
#     # subscription.save()
#     user.subscription = djstripe_subscription
#     print("done")
#     # user.save()
