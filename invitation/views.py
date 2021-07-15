from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import InviteUserSerializer

from invitation.tasks import send_email_to_invite_user
# Create your views here.


class InvitedUserApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InviteUserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save(inviter=self.request.user)
            user_data = serializer.data
            data = {'inviter': request.user.username, 'invited_user': user_data['invited_user']}
            send_email_to_invite_user(data)
            content = {'status': True, 'message': 'Invitation Sent', 'result': serializer.data}

            return Response(content, status=status.HTTP_200_OK)
        else:
            content = {'status': False, 'message': serializer.errors, 'result': 'please provide valid information.'}
            return Response(content, status=status.HTTP_200_OK)