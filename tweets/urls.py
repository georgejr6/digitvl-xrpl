from django.urls import path
from .views import TweetsCreateApiView, TweetsDetailApiView

urlpatterns = [
    path('tweets/create/', TweetsCreateApiView.as_view(), name='create-tweets'),
    path('tweets/detail/<str:username>/<int:tweet_id>/', TweetsDetailApiView.as_view(), name='tweet-detail'),

]