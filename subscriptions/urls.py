from django.urls import path
from .views import UserSubscriptionDetail, CreateSubscriptionApiView, GetCheckoutSession
urlpatterns = [
    path('user-subscription/detail/', UserSubscriptionDetail.as_view(), name='subscription-detail'),
    path('create-subscription/detail/', CreateSubscriptionApiView.as_view(), name='create-subscription'),
    path('get-checkout-session/<str:session_id>/', GetCheckoutSession.as_view(), name='get-checkout-session')


]