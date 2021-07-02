from django.db import models
from common.digitvl_timestamp import BaseTimestampModel


# Create your models here.
class Support(BaseTimestampModel):
    ISSUE_RESOLVED_CHOICES = ((1, 'Issue unresolved'), (2, 'Pending'), (3, 'Issue Resolved'))
    name = models.CharField(max_length=250)
    email = models.EmailField(max_length=250)
    support_type = models.CharField(max_length=250)
    support_message = models.TextField(max_length=500)
    issue_resolved = models.CharField(max_length=100, choices=ISSUE_RESOLVED_CHOICES, default='Issue unresolved')

    def __str__(self):
        return f'{self.name} want support for {self.support_type}'



