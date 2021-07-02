from django.urls import path
from .views import  save_stripe_info,  DonationRequestView

urlpatterns = [
    path('donations/stripe/', DonationRequestView.as_view(), name='donation'),
    path('save-stripe-info/', save_stripe_info),
]