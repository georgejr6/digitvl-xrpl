from django.urls import path
from .views import UserFeeds, NotificationUnreadListApiView, NotificationReadApiView, GetFeaturedSongApiView

urlpatterns = [
    path('feeds/', UserFeeds.as_view(), name='user-feeds'),
    path('feeds/current-user/', UserFeeds.as_view(), name='user-feeds'),
    path('notification/', NotificationUnreadListApiView.as_view(), name='notification'),
    path('notification/read/', NotificationReadApiView.as_view(), name='notification-read'),

    # featured songs
    path('featured/songs/', GetFeaturedSongApiView.as_view(), name='featured-songs'),
]
