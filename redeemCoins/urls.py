from django.urls import path

from .views import RedeemCoinsForFeaturedSong, RedeemCoinsForFeaturedPlaylist, CreatePurchaseCoinsApiView, GetPurchaseCoinsCheckoutSession

urlpatterns = [
    path('redeem/coins/featured/track/<int:track_id>/', RedeemCoinsForFeaturedSong.as_view(), name='featured song'),
    path('redeem/coins/featured/playlist/<str:slug>/', RedeemCoinsForFeaturedPlaylist.as_view(),
         name='featured playlist'),

    path('buy-coins/', CreatePurchaseCoinsApiView.as_view(), name='buy-coins'),
    path('get-buy-coins/<str:session_id>/', GetPurchaseCoinsCheckoutSession.as_view(), name='get-coins-session')

]