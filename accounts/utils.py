from django.core.mail import EmailMultiAlternatives

import threading

from django.template.loader import get_template


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class Util:
    @staticmethod
    def send_email(data):
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
            subject=mail_subject, body=data['email_body'], from_email=sender,  to=[data['to_email']], headers=headers
        )
        email.attach_alternative(html_content, 'text/html')
        EmailThread(email).start()
