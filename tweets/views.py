# Create your views here.
import redis
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from feeds.utils import create_action
from .models import Tweets
from .serializers import TweetsSerializer

# connect to redis
redis_cache = redis.StrictRedis(host=settings.REDIS_HOST,
                                port=settings.REDIS_PORT,
                                db=settings.REDIS_DB)


class TweetsCreateApiView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        error_result = {}
        serializer = TweetsSerializer(data=request.data, context={'request': request})
        current_coins = redis_cache.hget('users:{}:coins'.format(request.user.id), request.user.id)
        print(current_coins)

        if serializer.is_valid():
            if current_coins is None:
                content = {'status': False,
                           'message': "you don't have sufficient coins to post a tweet, you must have 50 coins to "
                                      "post a tweet.",
                           'result': error_result}
                return Response(content, status=status.HTTP_200_OK)
            if int(current_coins) < 50:

                content = {'status': False,
                           'message': "you don't have sufficient coins to post a tweet, you must have 50 coins to "
                                      "post a tweet.",
                           'result': error_result}
                return Response(content, status=status.HTTP_200_OK)

            else:
                new_tweets = serializer.save(added_by=self.request.user)
                new_tweets.save()
                output = "your tweet was sent"
                redis_cache.hincrby('users:{}:coins'.format(request.user.id), request.user.id, -50)
                create_action(request.user, 'tweeted', new_tweets, 7)
                content = {'status': True, 'message': output, 'result': serializer.data,
                           }
                # feeds handling
                # create_action(request.user, 'posted a tweet', new_t, verb_id=1)
                return Response(content, status=status.HTTP_200_OK)
        content = {'status': False, 'message': serializer.errors, 'result': error_result}
        return Response(content, status=status.HTTP_200_OK)


class TweetsDetailApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TweetsSerializer

    def get(self, request, username, tweet_id, *args, **kwargs):
        tweets_detail = get_object_or_404(Tweets, pk=tweet_id, added_by__username=username)
        resp_obj = dict(
            beats_detail=self.serializer_class(tweets_detail, context={"request": request}).data)
        return views.Response(resp_obj, status=status.HTTP_200_OK)
