from django.shortcuts import get_object_or_404
from rest_framework import permissions

from beats.models import Songs, PlayList


class IsPlaylistUserOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method == "POST":
            playlist_obj = get_object_or_404(PlayList, slug=view.kwargs['slug'])
            return playlist_obj.owner == request.user

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

        # Write permissions are only allowed to the owner of the subscriber.


class IsPlaylistObjectPermissionUserOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


# Write permissions are only allowed to the owner of the subscriber.
class IsSongUserOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method == "POST":
            song_obj = get_object_or_404(Songs, id=view.kwargs['track_id'])
            return song_obj.user == request.user
