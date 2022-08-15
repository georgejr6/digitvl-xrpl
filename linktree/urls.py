from django.urls import path
from linktree.views import LinkTreeCreateApiView, LinkUpdateApiView, GetLinkTreeApiView, GetCurrentUserLinkTreeApiView

urlpatterns = [
    path('link-tree/create/', LinkTreeCreateApiView.as_view(), name='create-link-tree'),
    path('link-tree/current-user/', GetCurrentUserLinkTreeApiView.as_view(), name='get-current-link-tree'),
    path('link-tree/<str:username_slug>/link/', GetLinkTreeApiView.as_view(), name='get-link-tree'),

    path('link-tree/update/<int:id>/', LinkUpdateApiView.as_view(), name='link-tree-update-view'),
    ]