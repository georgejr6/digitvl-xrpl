from rest_framework import serializers


class DonationSerializer(serializers.Serializer):
    amount = serializers.IntegerField()

# class DonationsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Donations
#         fields = ['name', 'email', 'insta_username', 'amount']
