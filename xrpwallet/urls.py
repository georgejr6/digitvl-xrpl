from django.urls import path
from .views import CreateUserXrpWalletView, SendXrpToUsersView, AddXrpToBalanceView

urlpatterns = [
    path('xrp/wallet/create/', CreateUserXrpWalletView.as_view(), name='create-xrp-wallet'),
    path('xrp/send/', SendXrpToUsersView.as_view(), name='send_xrp_to_users'),
    path('xrp/earn-by/like-song/', AddXrpToBalanceView.as_view(), name='add_earn_xrp_to_balance'),

]
