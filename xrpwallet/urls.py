from django.urls import path
from .views import CreateUserXrpWalletView
urlpatterns = [
    path('xrp/wallet/create/', CreateUserXrpWalletView.as_view(), name='create-xrp-wallet'),

]