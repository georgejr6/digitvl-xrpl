from django.urls import path
from .views import BlogCreateApiView, BlogsDetailApiView, BlogsListView

urlpatterns = [
    path('blogs/', BlogsListView.as_view(), name='blog-list'),
    path('blog/create/', BlogCreateApiView.as_view(), name='create-blog'),
    path('blog/detail/<str:slug>/', BlogsDetailApiView.as_view(), name='blog-detail'),

]