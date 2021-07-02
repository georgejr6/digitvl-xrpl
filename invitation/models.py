import redis
from django.conf import settings
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from accounts.models import User
from common.digitvl_timestamp import BaseTimestampModel
from .tasks import send_email_to_invite_user

redis_cache = redis.StrictRedis(host=settings.REDIS_HOST,
                                port=settings.REDIS_PORT,
                                db=settings.REDIS_DB)


class InviteUser(BaseTimestampModel):
    inviter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    invited_user = models.EmailField(max_length=255)
    accepted_invitation = models.BooleanField(default=False)

    class Meta:
        ordering = ('created_at',)


# @receiver(post_save, sender=InviteUser)
# def send_invitation(sender, instance, **kwargs):
#     data = {'inviter': instance.inviter.email, 'invited_user': instance.invited_user}
#     print(data)
#     send_email_to_invite_user.delay(data)

# def send_invitation(sender, instance, **kwargs):
#     print(instance.id)
#     try:
#         if InviteUser.objects.filter(invited_user=instance.email).exists() and instance.is_email_verified:
#             refer_user = InviteUser.objects.get(invited_user=instance.email)
#             refer_by = refer_user.inviter.id
#
#             user_detail = get_object_or_404(User, id=refer_by)
#             redis_cache.hincrby('users:{}:coins'.format(user_detail.id), user_detail.id, 5)
#             current_coins = redis_cache.hget('users:{}:coins'.format(user_detail.id), user_detail.id)
#             print(current_coins)
#
#             # data = {'inviter': instance.inviter.email, 'invited_user': instance.invited_user}
#             # print(data)
#             # send_email_to_invite_user.delay(data)
#         else:
#             print("no need to add coin.")
#     except NotImplementedError:
#         print(" coins not added, make a flow of it. ")

#
# def send_invitation():
#
#     InviteUser.objects.filter(invited_user=instance.email).exists() and instance.is_email_verified
#     refer_user = InviteUser.objects.get(invited_user=instance.email)
#     refer_by = refer_user.inviter.id
#
#     user_detail = get_object_or_404(User, id=refer_by)
#     redis_cache.hincrby('users:{}:coins'.format(user_detail.id), user_detail.id, 5)
#     current_coins = redis_cache.hget('users:{}:coins'.format(user_detail.id), user_detail.id)
#     print(current_coins)
#
#         # data = {'inviter': instance.inviter.email, 'invited_user': instance.invited_user}
#         # print(data)
#         # send_email_to_invite_user.delay(data)
