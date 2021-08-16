from django.db import models

# Create your models here.
from common.digitvl_timestamp import BaseTimestampModel


class Advertisement(BaseTimestampModel):
    description = models.CharField(max_length=255)
    advertisement_image = models.ImageField(upload_to='ads/', verbose_name='Advertisement Image')
    advertisement_url = models.URLField(help_text='use to redirect to the ad detail page',
                                        verbose_name='Advertisement Url')
    approve = models.BooleanField(default=False)

    def __str__(self):
        return self.description[:10]

    class Meta:
        verbose_name_plural = 'Advertisements'

