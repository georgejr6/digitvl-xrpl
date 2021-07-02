# Create your views here.
from rest_framework import views, permissions, status

from support.serializers import SupportSerializer
from .utils import Util


class SupportRequestView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = SupportSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            Util.send_support_email(data)
            serializer.save()
            return views.Response(
                {'status': True, "message": "your support request sent successfully, we will get back to you asap. "
                                            "Thank-you for your patience"},
                status=status.HTTP_200_OK)
        else:
            return views.Response(
                {'status': False, "message": "something went wrong, please try later"},
                status=status.HTTP_200_OK)
