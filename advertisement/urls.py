from django.urls import path
from advertisement.views import GetAdvertisementApiView

urlpatterns = [
    path('ads/', GetAdvertisementApiView.as_view(), name='advertisement-api-view'),
    ]