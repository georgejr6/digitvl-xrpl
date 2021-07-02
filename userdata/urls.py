from django.urls import path
from .views import CurrentUserBeats, UserProfileBeatsView, UserProfilePlaylistView, UserlikeDetail, PlaylistView, \
    UserProfileDetail, PlaylistDetailView, FollowUserView, ListFollowersView, ListFollowingView, WhoToFollowList, \
    FollowedStatusView, PlaylistSongsDeleteView, PlaylistDeleteView

urlpatterns = [
    # other user urls
    path('profile/<str:username_slug>/detail/', UserProfileDetail.as_view(), name='profile-detail'),
    path('profile/<str:username_slug>/tracks/', UserProfileBeatsView.as_view(), name='profile-beats'),
    path('profile/<str:username_slug>/playlist/<str:slug>/detail/', PlaylistDetailView.as_view(),
         name='profile-playlist-detail'),
    path('profile/<str:username_slug>/playlist/', UserProfilePlaylistView.as_view(), name='profile-playlist'),

    # current user urls
    path('you/library/tracks/', CurrentUserBeats.as_view(), name='you-library-tracks'),
    path('you/library/likes/', UserlikeDetail.as_view(), name='you-library-like'),
    path('you/library/playlist/', PlaylistView.as_view(), name="you-library-playlist"),

    path('profile/<int:pk>/follow/', FollowUserView.as_view(), name="follow-user"),
    path('profile/<str:username_slug>/follower/list/', ListFollowersView.as_view(), name="follower-list"),
    path('profile/<str:username_slug>/following/list/', ListFollowingView.as_view(), name="following-list"),

    path('suggestions/<str:username_slug>/who-to-follow/list/', WhoToFollowList.as_view(), name="who-to-follow"),

    path('check/<str:username_slug>/follow/status/', FollowedStatusView.as_view(), name="check-follow-status"),

    # playlist song deleted
    path('you/library/playlist/<str:slug>/delete/song/<int:song_id>/', PlaylistSongsDeleteView.as_view(),
         name="playlist-song-deleted"),

    path('you/library/delete/playlist/<str:slug>/', PlaylistDeleteView.as_view(), name="playlist-deleted"),
]
