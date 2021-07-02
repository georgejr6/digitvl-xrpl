import djstripe
import stripe
from django.shortcuts import render

# Create your views here.
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated

from subscriptions.models import UserSubscription, UserMembership, Membership
from subscriptions.serializers import UserMembershipSerializer


# getting details of the user subscription plan
class UserSubscriptionDetail(views.APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserMembershipSerializer

    # create_serializer_class = CreateInviteBrandSerializer

    def get(self, request, *args, **kwargs):
        user_subscription = UserSubscription.objects.filter(user_membership__user__username=request.user.username)
        print(user_subscription)
        resp_obj = dict(
            subcription_data=self.serializer_class(user_subscription, context={"request": request}, many=True).data,

        )
        return views.Response(resp_obj, status=status.HTTP_200_OK)


def get_user_membership(request):
    user_membership_qs = UserMembership.objects.filter(user=request.user)
    if user_membership_qs.exists():
        return user_membership_qs.first()
    return None


def get_user_subscription(request):
    user_subscription_qs = UserSubscription.objects.filter(
        user_membership=get_user_membership(request))
    if user_subscription_qs.exists():
        user_subscription = user_subscription_qs.first()
        return user_subscription
    return None


# view for creating subscriptions of the user

class CreateSubscriptionApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    price = "price_1J0ivNI4e8u2GP8qVIhItBc7"
    domain_url = "http://127.0.0.1:8000/"

    def post(self, request, *args, **kwargs):
        try:
            # Create new Checkout Session for the order
            # Other optional params include:
            # [billing_address_collection] - to display billing address details on the page
            # [customer] - if you have an existing Stripe Customer ID
            # [customer_email] - lets you prefill the email input in the form
            # For full details see https:#stripe.com/docs/api/checkout/sessions/create

            # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            customer = None
            user_customer_id = UserMembership.objects.filter(user_membership__user__username=request.user.username)
            customer = user_customer_id
            checkout_session = stripe.checkout.Session.create(
                success_url='http://127.0.0.1:8000/checkout-session/{CHECKOUT_SESSION_ID}',
                cancel_url=self.domain_url + '/canceled.html',
                payment_method_types=['card'],
                customer=customer,
                mode='subscription',
                line_items=[{
                    'price': self.price,
                    'quantity': 1
                }],
            )
            print(checkout_session)
            return views.Response(checkout_session, status=status.HTTP_200_OK)
        except Exception as e:
            return views.Response({'error': {'message': str(e)}})


# Fetch the Checkout Session to display the JSON result on the success page

class GetCheckoutSession(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, session_id, *args, **kwargs):
        try:
            id = session_id

            checkout_session = stripe.checkout.Session.retrieve(id)
            customer = stripe.Customer.retrieve(id=checkout_session.customer)
            djstripe_customer = djstripe.models.Customer.sync_from_stripe_data(customer)

            subscription = stripe.Subscription.retrieve(id=checkout_session.subscription)
            print(subscription.created)

            return views.Response(checkout_session, status=status.HTTP_200_OK)
        except Exception as e:
            return views.Response({'error': {'message': str(e)}}, status=status.HTTP_200_OK)

# class CreateSubscriptionApiView(views.APIView):
#     permission_classes = [IsAuthenticated]
#
#     def post(self, request, *args, **kwargs):
#
#         stripe.api_key = djstripe.settings.STRIPE_SECRET_KEY
#
#         current_user_membership_obj = get_user_membership(request)
#         user_subscription = get_user_subscription(request)
#         # get current user membership as a str
#         current_user_membership = str(current_user_membership_obj.membership)
#         selected_membership = request.data.get('membership_type')
#
#         # fetch the selected membership object
#         selected_membership_qs = Membership.objects.filter(membership_type=selected_membership)
#
#         # check membership exists or not
#         if selected_membership_qs.exists():
#             selected_membership = selected_membership_qs.first()
#
#         # validation
#         if current_user_membership == selected_membership:
#             if user_subscription is not None:
#                 message = f"you already have this membership, your next payment is due' {'get this value from stripe'}"
#         try:
#             current_user_membership_obj.membership = selected_membership_qs
#
#             # update stripe customer
#             stripe_customer = stripe.Customer.modify(
#                 sid=current_user_membership_obj.customer.id,
#                 email=current_user_membership_obj.user.email,
#             )
#             djstripe_customer = djstripe.models.Customer.sync_from_stripe_data(stripe_customer)
#             current_user_membership_obj.customer = djstripe_customer
#             current_user_membership_obj.save()
#
#             stripe_subscription = stripe.Subscription.modify(
#                 sid=user_subscription.stripe_subscription_id,
#                 customer=current_user_membership_obj.customer.id,
#                 items=[{'price': 'price_1J0ivNI4e8u2GP8qVIhItBc7'}],
#             )
#             # sync data with subscription dj stripe
#             djstripe_subscription = djstripe.models.Subscription.sync_from_stripe_data(stripe_subscription)
#
#             subscription_data = djstripe_subscription
#             subscription = UserSubscription.objects.update(
#                 user_membership=current_user_membership_obj,
#                 stripe_subscription_id=stripe_subscription["id"],
#                 subscription=subscription_data
#
#             )
#             subscription.save()
#
#         except Exception as e:
#             print("your card has been declined")
