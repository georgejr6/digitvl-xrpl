from django.db import models
from django.conf import settings

# Create your models here.
# Testnet wallet database
from common.digitvl_timestamp import BaseTimestampModel


class XRPWallet(BaseTimestampModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_xrp_wallet')
    xrp_public_address = models.CharField(max_length=500)
    # xrp_secret = models.CharField(max_length=255)
    xrp_balance = models.DecimalField(max_digits=12, decimal_places=2)
    xrp_sequence = models.PositiveBigIntegerField()
