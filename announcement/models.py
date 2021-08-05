from django.db import models


# Create your models here.
from common.digitvl_timestamp import BaseTimestampModel


class Announcement(BaseTimestampModel):
    announcement = models.TextField(max_length=1000)

    def __str__(self):
        return self.announcement
