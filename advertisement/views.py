from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from advertisement.models import Advertisement
from advertisement.serializers import AdvertisementSerializer


@permission_classes([AllowAny])
class GetAdvertisementApiView(ListAPIView):
    queryset = Advertisement.objects.all().order_by('?')[:1]
    serializer_class = AdvertisementSerializer
