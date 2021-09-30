from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework import views, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from linktree.models import LinkTree
from linktree.permission import LinkUpdatePermission
from linktree.serializers import LinkTreeSerializer, DataSerialzier


class LinkTreeCreateApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DataSerialzier

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # print(serializer.data['data'])
            for link_tree_data in serializer.data['data']:
                LinkTree.objects.create(artist=request.user, title=link_tree_data['title'], url=link_tree_data['url'])
            return views.Response(serializer.data, status=status.HTTP_200_OK)

        # if serializer.is_valid(raise_exception=True):
        #     serializer.save(artist=self.request.user)

        return views.Response(serializer.data, status=status.HTTP_200_OK)


class LinkCreateApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LinkTreeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(artist=self.request.user)
            return views.Response(serializer.data, status=status.HTTP_200_OK)

        return views.Response(serializer.data, status=status.HTTP_200_OK)


class LinkUpdateApiView(RetrieveUpdateDestroyAPIView):
    permission_classes = [LinkUpdatePermission]
    lookup_field = 'id'
    serializer_class = LinkTreeSerializer
    queryset = LinkTree.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        # set partial=True to update a data partially
        serializer = self.serializer_class(instance=instance, data=request.data,
                                           partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            output = "Successfully url updated"
            content1 = {'success': [output]}
            content = {'status': True, 'message': content1, 'result': serializer.data}
            return views.Response(content, status=status.HTTP_200_OK)
        else:
            content = {'status': False, 'message': serializer.errors, 'result': {}}
            return views.Response(content, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            # delete_action(instance, instance.id)
            instance.delete()
            content = {'status': True, 'message': {"Successfully deleted"}}
            return views.Response(content, status=status.HTTP_200_OK)
        except LinkTree.DoesNotExist:
            content = {'status': False, 'message': {"something went wrong"}}
            return views.Response(content, status=status.HTTP_200_OK)
