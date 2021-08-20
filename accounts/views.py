import redis
from django.conf import settings
from django.contrib.auth import logout as django_logout
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, views
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import ObtainJSONWebToken

from .models import Profile, User, Contact
from .permission import IsOwnerOrReadOnly
from .serializers import (GetFullUserSerializer, UpdateProfileSerializer, UserSerializerWithToken,
                          EmailVerificationSerializer, ResetPasswordRequestSerializer, ResetPasswordSerializer,
                          Important_Notification)
from accounts.tasks import send_coin_to_referral_user, send_important_announcement, send_email_verification_token
from .utils import Util

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
# connect to redis
redis_cache = redis.StrictRedis(host=settings.REDIS_HOST,
                                port=settings.REDIS_PORT,
                                db=settings.REDIS_DB)


class CurrentUserApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        """
        Determine the current user by their token, and return their data
        """
        serializer = GetFullUserSerializer(request.user, context={'request': request})
        return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        error_result = {}

        serializer = UserSerializerWithToken(data=request.data)

        if serializer.is_valid():
            serializer.save()
            user_data = serializer.data

            token = Token.objects.get(user_id=user_data['id'])

            absolute_url = 'https://' + 'digitvl.com/email-verify/' + str(token)
            email_body = 'Hey' + user_data['username'] + ' use the link below to verify your email \n' \
                         + absolute_url
            data = {'email_body': email_body, 'to_email': user_data['email'], 'username': user_data['username'],
                    'email_subject': 'Verify your email'}

            send_email_verification_token.delay(data)
            output = "Successfully accounts created, please check your provided email for verification."
            content = {'status': True, 'message': output}
            return Response(content, status=status.HTTP_200_OK)
        content = {'status': False, 'message': serializer.errors, 'result': error_result}
        return Response(content, status=status.HTTP_200_OK)


class ProfileUpdateAPIView(UpdateAPIView):
    authentication_classes = [JSONWebTokenAuthentication, ]
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'user_id'
    serializer_class = UpdateProfileSerializer
    queryset = Profile.objects.all()

    def patch(self, request, *args, **kwargs):

        instance = self.get_object()
        serializer = UpdateProfileSerializer(instance=instance, data=request.data,
                                             partial=True, context={'request': request})  # set partial=True to
        # update a data partially
        if serializer.is_valid():
            serializer.save()
            output = "Successfully account updated"
            content1 = {'success': [output]}
            content = {'status': True, 'message': content1, 'result': serializer.data}
            return Response(content, status=status.HTTP_200_OK)
        else:
            content = {'status': False, 'message': serializer.errors, 'result': {}}
            return Response(content, status=status.HTTP_200_OK)


class LogoutView(APIView):
    authentication_classes = [JSONWebTokenAuthentication, ]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        django_logout(request)
        return Response(status=204)


class LoginView(ObtainJSONWebToken):

    def post(self, request, *args, **kwargs):
        response = super(LoginView, self).post(request, *args, **kwargs)
        current_coins = 0
        res = response.data
        req = request.data
        email = req.get('email')
        password = req.get('password')
        try:
            user = User.objects.get(email=email)
            try:
                current_coins = redis_cache.hget('users:{}:coins'.format(user.id), user.id)
            except redis.ConnectionError:
                pass
            if not user.is_email_verified:
                return Response({'status': False,
                                 'message': 'please verify your account first, We have send the '
                                            'verification email to your provided email. If the email is not in primary '
                                            'check your promotion or spam folder. ''Thanks, Keep Supporting.',
                                 'result': {}},
                                status=status.HTTP_200_OK)
            if not user.check_password(password):
                return Response({'status': False,
                                 'message': 'Incorrect password',
                                 'result': {}},
                                status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'status': False,
                             'message': 'user not found',
                             'result': {}},
                            status=status.HTTP_200_OK)

        token = res.get('token')
        if current_coins:
            res['user']['coins'] = int(current_coins)
        else:
            res['user']['coins'] = 0
        if token:
            user = jwt_decode_handler(token)

        content = {'user': res}

        return Response({'status': True,
                         'message': 'Successfully logged in',
                         'result': content},
                        status=status.HTTP_200_OK)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        # try:
        result = request.data
        token = request.POST.get('token')

        # payload = jwt_decode_handler(token)
        user = User.objects.get(email_verification_token=token)
        # serializer = UserSerializerWithToken(user, context={'request': request})
        if not user.is_email_verified:
            user.is_email_verified = True
            to_follow = User.objects.get(id=12)

            obj_id = Contact.objects.get_or_create(
                user_from=user,
                user_to=to_follow)

            data = {'username': user.username, 'user_email': user.email,
                    'is_email_verified': user.is_email_verified}

            # send_welcome_email.delay(data)
            send_coin_to_referral_user(data)
            user.save()

            return Response({'status': True, 'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': True, 'email': 'your account is already verified'},
                            status=status.HTTP_200_OK)
    # except Exception:
    #     return Response({'status': False, 'error': 'please provide correct token'}, status=status.HTTP_200_OK)


class ResetPasswordRequestView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            response = dict()
            email = serializer.data['email']
            try:
                user = User.objects.get(email=email)
                if user:
                    response['email'] = user.email

                    response['full_name'] = user.get_full_name()
                    response['status'] = True
                    response[
                        'message'] = "Email Sent to your provided email, Please follow the steps to add new password."

                    user.reset_password()
                    status_code = status.HTTP_200_OK
                    return views.Response(response, status=status_code)
            except User.DoesNotExist:
                response['status'] = False
                status_code = status.HTTP_200_OK
                response['message'] = "Could not find user"
                return views.Response(response, status=status_code)


class ResetPasswordView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            response = dict()
            code_verified = False
            status_c = ""
            message = ""

            user = User.objects.get(email=data['email'])

            if user:
                try:
                    code = int(data['code'])
                except ValueError:
                    status_c = False
                    message = "Invalid Code"
                else:
                    if user.reset_password_verify_code(code, confirmed=True):
                        code_verified = True
                    else:
                        status_c = False
                        message = "Failed to reset the password"

                if code_verified:
                    user.set_password(data['password'])
                    user.save()

                    status_c = True
                    message = 'Password Changed'
            else:
                status_c = False
                message = "Could not find user"

            response['status'] = status_c
            if status_c:
                status_code = status.HTTP_200_OK
            else:
                status_code = status.HTTP_200_OK
            response['message'] = message

            return views.Response(response, status=status_code)


# coins feature
class CounterCoinsApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        user_detail = get_object_or_404(self.queryset, id=request.user.id)
        redis_cache.hincrby('users:{}:coins'.format(user_detail.id), user_detail.id, 5)
        current_coins = redis_cache.hget('users:{}:coins'.format(user_detail.id), user_detail.id)
        resp_obj = dict(
            status=True,
            total_coins=current_coins,
            message="Coins Added"

        )
        return views.Response(resp_obj, status=status.HTTP_200_OK)


class GetUserCoinsApiView(views.APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        user_detail = get_object_or_404(self.queryset, id=request.user.id)
        coins = redis_cache.hget('users:{}:coins'.format(user_detail.id), user_detail.id)
        resp_obj = dict(
            status=True,
            coins=coins

        )
        return views.Response(resp_obj, status=status.HTTP_200_OK)


class SendEmailNonVerifiedAccount(views.APIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def post(self, *args, **kwargs):
        user_non_verified_account = User.objects.filter(is_email_verified=False)
        for user_data in user_non_verified_account:
            absolute_url = 'https://' + 'digitvl.com/email-verify/' + str(user_data.email_verification_token)
            email_body = 'Hi ' + user_data.username + \
                         ' Use the link below to verify your email \n' + absolute_url
            data = {'email_body': email_body, 'to_email': user_data.email,
                    'email_subject': 'Verify your email'}

        # send_email_to_non_verify_account(data)

        resp_obj = dict(
            status=True, )
        return views.Response(resp_obj, status=status.HTTP_200_OK)


# send important notification email to the users.
class SendAnnouncementEmail(views.APIView):
    serializer_class = Important_Notification
    permission_classes = [AllowAny]

    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        # fetch user email
        serializer = self.serializer_class(data=request.data)

        message = request.data
        for user_data in User.objects.all():
            email_body = message['body']
            data = {'email_body': email_body, 'username': user_data.username, 'to_email': user_data.email,
                    'email_subject': 'Important Announcement'}
            send_important_announcement(data)

        resp_obj = dict(
            status=True, )
        return views.Response(resp_obj, status=status.HTTP_200_OK)


class GetAllUsersApiView(APIView):
    queryset = User.objects.all()
    serializer_class = GetFullUserSerializer

    def get(self, request):
        users = User.objects.all()
        resp_obj = dict(
            user_data=self.serializer_class(users, context={"request": request}, many=True).data,

        )
        return views.Response(resp_obj, status=status.HTTP_200_OK)


my_login = LoginView.as_view()
