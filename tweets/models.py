from django.contrib.humanize.templatetags import humanize
from django.db import models

# Create your models here.
from accounts.models import User
from common.digitvl_timestamp import BaseTimestampModel
from rest_framework.reverse import reverse as api_reverse


class Tweets(BaseTimestampModel):
    tweet = models.CharField(max_length=750)
    media_image = models.ImageField(upload_to='tweets/%Y/%m/%d/', blank=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "tweets"
        ordering = ('-created_at',)

    @property
    def get_created_at(self):
        return humanize.naturaltime(self.created_at)

    def __str__(self):
        return f'{self.tweet}'

    def get_api_url(self, request=None):
        return api_reverse('tweet-detail', kwargs={'username': self.added_by.username,
                                                   'tweet_id': self.id}, request=request)


