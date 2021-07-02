from django.urls import path

from .views import RedeemCoinsForFeaturedSong, RedeemCoinsForFeaturedPlaylist

urlpatterns = [
    path('redeem/coins/featured/track/<int:track_id>/', RedeemCoinsForFeaturedSong.as_view(), name='featured song'),
    path('redeem/coins/featured/playlist/<str:slug>/', RedeemCoinsForFeaturedPlaylist.as_view(),
         name='featured playlist'),

]