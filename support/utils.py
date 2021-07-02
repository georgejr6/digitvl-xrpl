from django.core.mail import EmailMultiAlternatives, send_mail


class Util:
    @staticmethod
    def send_support_email(data):
        try:
            sender = data['email']
            subject, from_email, to = 'Support Help', sender, 'digitvlhub@gmail.com'
            text_content = data['support_message']
            html_content = 'I am + :{}, my issue is:{}, user-email {} '.format(data['name'], data['support_message'], data['email'])
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])

            msg.attach_alternative(html_content, "text/html")
            msg.send()
        except Exception as e:
            print(e)
