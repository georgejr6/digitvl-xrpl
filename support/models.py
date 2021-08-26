from django.db import models
from common.digitvl_timestamp import BaseTimestampModel


# Create your models here.
class Support(BaseTimestampModel):
    class IssueResolvedChoices(models.IntegerChoices):
        IUR = 1, "unresolved"
        PEN = 2, "Pending"
        IR = 3, "resolved"

    name = models.CharField(max_length=250)
    email = models.EmailField(max_length=250)
    support_type = models.CharField(max_length=250)
    support_message = models.TextField(max_length=500)
    status = models.PositiveSmallIntegerField(choices=IssueResolvedChoices.choices,
                                              default=IssueResolvedChoices.PEN)

    def __str__(self):
        return f'{self.name} want support for {self.support_type}'
