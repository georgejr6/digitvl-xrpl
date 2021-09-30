from django.urls import path
from linktree.views import LinkTreeCreateApiView, LinkUpdateApiView, LinkCreateApiView

urlpatterns = [
    path('link-tree/create/', LinkTreeCreateApiView.as_view(), name='create-link-tree'),
    path('link-tree/create/test/', LinkCreateApiView.as_view(), name='create-link-tree'),
    path('link-tree/update/<int:id>/', LinkUpdateApiView.as_view(), name='link-tree-update-view'),
    ]