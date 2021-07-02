# Create your views here.
import redis
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import views, status, permissions
from rest_framework.permissions import IsAuthenticated

from accounts.models import User
from accounts.permission import IsOwnerOrReadOnly
from beats.models import Songs, PlayList
from beats.permissions import IsSongUserOrReadOnly, IsPlaylistUserOrReadOnly
from feeds.utils import create_action
from .serializers import RedeemCoinsSerializer

# connect to redis
redis_cache = redis.StrictRedis(host=settings.REDIS_HOST,
                                port=settings.REDIS_PORT,
                                db=settings.REDIS_DB)


# class RedeemCoinsFeaturedAPIView(ListAPIView):
#     pagination_class = StandardResultsSetPagination
#     permission_classes = [IsAuthenticated]
#     serializer_class = FeaturedSerializer
#     queryset = Featured.objects.all()
#
#     def get(self, request, *args, **kwargs):
#         # Display all actions by default
#         featured_things = self.queryset.select_related('user__profile').prefetch_related('target')[:10]
#
#         page = self.pagination_class()
#         resp_obj = page.generate_response(featured_things, FeaturedSerializer, request)
#         return resp_obj


class RedeemCoinsForFeaturedSong(views.APIView):
    permission_classes = [IsSongUserOrReadOnly]
    serializer_class = RedeemCoinsSerializer
    queryset = Songs.objects.all()

    def post(self, request, *args, track_id, **kwargs):

        try:
            coins = int(request.POST.get('coins'))
            song_object = get_object_or_404(self.queryset, id=track_id, user=request.user.id)

            current_coins = redis_cache.hget('users:{}:coins'.format(request.user.id), request.user.id)
            # if user coins is 100, he can featured his track on featured tab view
            if int(current_coins) >= coins:
                create_action(request.user, 'featured songs', song_object, 4)
                redis_cache.hincrby('users:{}:coins'.format(request.user.id), request.user.id, -coins)
                return views.Response({'status': True, "message": "song is added on featured"},
                                      status=status.HTTP_200_OK)
            else:
                return views.Response(
                    {'status': False, "message": "your coins are insufficient for this.", 'result': {}},
                    status=status.HTTP_200_OK)
        except TypeError:
            return views.Response({'status': False, "message": "something wrong or may be you don't have any coin",
                                   'result': {}}, status=status.HTTP_200_OK)


class RedeemCoinsForFeaturedPlaylist(views.APIView):
    permission_classes = [IsPlaylistUserOrReadOnly]
    serializer_class = RedeemCoinsSerializer
    queryset = PlayList.objects.all()

    def post(self, request, *args, slug, **kwargs):

        try:
            coins = int(request.POST.get('coins'))
            playlist_object = get_object_or_404(self.queryset, slug=slug, owner=request.user.id)
            current_coins = redis_cache.hget('users:{}:coins'.format(request.user.id), request.user.id)
            # if user coins is 100, he can featured his track on featured tab view
            if int(current_coins) >= coins:
                create_action(request.user, 'featured playlist', playlist_object, 5)
                redis_cache.hincrby('users:{}:coins'.format(request.user.id), request.user.id, -coins)
                return views.Response({'status': True, "message": "playlist is added on featured"},
                                      status=status.HTTP_200_OK)
            else:
                return views.Response(
                    {'status': False, "message": "your coins are insufficient for this.", 'result': {}},
                    status=status.HTTP_200_OK)
        except TypeError:
            return views.Response({'status': False, "message": "something wrong or may be you don't have any coin.",
                                   'result': {}}, status=status.HTTP_200_OK)
