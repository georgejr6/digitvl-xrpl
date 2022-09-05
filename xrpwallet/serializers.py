from rest_framework import serializers

from xrpwallet.models import XRPWallet


class UserXrpWalletDetail(serializers.ModelSerializer):
    class Meta:
        model = XRPWallet
        fields = ('id', 'xrp_public_address', 'xrp_balance', 'xrp_sequence')
