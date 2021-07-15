from __future__ import absolute_import, unicode_literals
from celery import shared_task, Celery
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template

app = Celery('marketplace', broker='redis://localhost:6379/0')


@shared_task
def send_email_to_invite_user(data):
    absolute_url = 'https://' + 'digitvl.com'
    email_body = 'Hi ' + data['inviter'] + 'invited to Digitvl Platform \n' + absolute_url
    invite_email_template_html = 'users/emails/invite_user.html'
    sender = '"Digitvl" <noreply.digitvlhub@gmail.com>'
    headers = {'Reply-To': 'noreply.digitvlhub@gmail.com'}
    mail_subject = "Invitation"
    html_message = get_template(invite_email_template_html)
    template_context = {
        'refer_by': data['inviter'],

    }
    html_content = html_message.render(template_context)
    email = EmailMultiAlternatives(
        subject=mail_subject, body=email_body, from_email=sender, to=[data['invited_user']], headers=headers
    )
    email.attach_alternative(html_content, 'text/html')
    email.send(fail_silently=True)
