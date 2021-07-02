from __future__ import absolute_import, unicode_literals

import redis
from celery import shared_task, Celery
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import get_object_or_404
from django.template.loader import get_template

from accounts.models import User, Contact
from invitation.models import InviteUser

app = Celery()
# connect to redis
redis_cache = redis.StrictRedis(host=settings.REDIS_HOST,
                                port=settings.REDIS_PORT,
                                db=settings.REDIS_DB)


# send welcome email

@shared_task
def send_welcome_email(data):
    verification_email_template_html = 'users/emails/welcome_email.html'
    sender = '"Digitvl" <noreply.digitvlhub@gmail.com>'
    headers = {'Reply-To': 'noreply.digitvlhub@gmail.com'}
    mail_subject = "Welcome to Digitvl Platform"
    html_message = get_template(verification_email_template_html)
    template_context = {
        'username': data['username']
    }
    html_content = html_message.render(template_context)
    email = EmailMultiAlternatives(
        subject=mail_subject, body="Welcome to Digitvl", from_email=sender, to=[data['user_email']], headers=headers
    )
    email.attach_alternative(html_content, 'text/html')
    email.send(fail_silently=True)


# send email verify token to the users.
@shared_task
def send_email_verification_token(data):
    verification_email_template_html = 'users/emails/email_verification.html'
    sender = '"Digitvl" <noreply.digitvlhub@gmail.com>'
    headers = {'Reply-To': 'noreply.digitvlhub@gmail.com'}
    mail_subject = "Confirm Your Email Address"
    html_message = get_template(verification_email_template_html)
    template_context = {
        'verification_code': data['email_body'],
        'username': data['username'],

    }
    html_content = html_message.render(template_context)
    email = EmailMultiAlternatives(
        subject=mail_subject, body=data['email_body'], from_email=sender, to=[data['to_email']], headers=headers
    )
    email.attach_alternative(html_content, 'text/html')
    email.send(fail_silently=True)


# send email to non verify account.
@shared_task
def send_email_to_non_verify_account():
    try:
        user_non_verified_account = User.objects.filter(is_email_verified=False)
        for user_data in user_non_verified_account:
            absolute_url = 'https://' + 'digitvl.com/email-verify/' + str(user_data.email_verification_token)
            email_body = 'Hi ' + user_data.username + \
                         ' Use the link below to verify your email \n' + absolute_url
            data = {'email_body': email_body, 'to_email': user_data.email,
                    'email_subject': 'Verify your email'}

            verification_email_template_html = 'users/emails/email_verification.html'
            sender = '"Digitvl" <noreply.digitvlhub@gmail.com>'
            headers = {'Reply-To': 'noreply.digitvlhub@gmail.com'}
            mail_subject = "Confirm Your Email Address"
            html_message = get_template(verification_email_template_html)
            template_context = {
                'verification_code': data['email_body']
            }
            html_content = html_message.render(template_context)
            email = EmailMultiAlternatives(
                subject=mail_subject, body=data['email_body'], from_email=sender, to=[data['to_email']], headers=headers
            )
            email.attach_alternative(html_content, 'text/html')
            email.send(fail_silently=True)
    except User.DoesNotExist:
        print("no user found")


@shared_task
def send_coin_to_referral_user(data):
    try:
        if InviteUser.objects.filter(invited_user=data['user_email']).exists() and data['is_email_verified']:

            refer_user = InviteUser.objects.filter(invited_user=data['user_email']).first()
            refer_by = refer_user.inviter.id
            user_detail = get_object_or_404(User, id=refer_by)
            redis_cache.hincrby('users:{}:coins'.format(user_detail.id), user_detail.id, 25)
            current_coins = int(redis_cache.hget('users:{}:coins'.format(user_detail.id), user_detail.id))
            email_body = 'Hi ' + 'you earn the coin by inviting the users to our platform, keep inviting the users and ' \
                                 'earns coins.'
            verification_email_template_html = 'users/emails/coins_added.html'
            sender = '"Digitvl" <noreply.digitvlhub@gmail.com>'
            headers = {'Reply-To': 'noreply.digitvlhub@gmail.com'}
            mail_subject = "Invitation"
            html_message = get_template(verification_email_template_html)
            template_context = {
                'coins_added': 'Total Coins ' + str(current_coins)
            }
            html_content = html_message.render(template_context)
            email = EmailMultiAlternatives(
                subject=mail_subject, body=email_body, from_email=sender, to=[user_detail.email], headers=headers
            )
            email.attach_alternative(html_content, 'text/html')
            email.send(fail_silently=True)
        else:
            print("no data")
    except InviteUser.DoesNotExist:
        print("user not found.")


@shared_task
def send_important_announcement(data):
    try:
        announcement_email_template_html = 'users/emails/important_notification.html'
        sender = '"Digitvl" <noreply.digitvlhub@gmail.com>'
        headers = {'Reply-To': 'noreply.digitvlhub@gmail.com'}
        mail_subject = "Important Announcement"
        html_message = get_template(announcement_email_template_html)
        template_context = {
            'body': data['email_body'],
            'username': data['username'],

        }
        html_content = html_message.render(template_context)
        email = EmailMultiAlternatives(
            subject=mail_subject, body=data['email_body'], from_email=sender, to=[data['to_email']], headers=headers
        )
        email.attach_alternative(html_content, 'text/html')
        email.send(fail_silently=True)
    except IOError as e:
        print(e)


# this task is used to make all user follow the admin
@shared_task
def follow_admin():
    queryset = User.objects.exclude(id=12)
    to_follow = User.objects.get(id=12)
    for user in queryset:
        Contact.objects.get_or_create(
            user_from=user,
            user_to=to_follow)
    print("task done.")
