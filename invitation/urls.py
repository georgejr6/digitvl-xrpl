from django.urls import path
from .views import InvitedUserApiView
urlpatterns = [
    path('invite/user/', InvitedUserApiView.as_view(), name='invite-user'),

]