from django.urls import path
from advertisement.views import GetAdvertisementApiView, GiveRewardOnAdvertisement

urlpatterns = [
    path('poster/', GetAdvertisementApiView.as_view(), name='advertisement-api-view'),
    path('poster/reward/<int:poster_id>/', GiveRewardOnAdvertisement.as_view(), name='reward-advertisement-api-view'),
    ]