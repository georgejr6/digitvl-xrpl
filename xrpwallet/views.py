# Define the network client
import json

from django.shortcuts import get_object_or_404
from rest_framework import views, permissions, status
from rest_framework.response import Response
from xrpl.clients import JsonRpcClient
from xrpl.models import AccountInfo
from xrpl.wallet import generate_faucet_wallet
from xrpl.core import addresscodec

from accounts.models import User
from xrpwallet.models import XRPWallet


class CreateUserXrpWalletView(views.APIView):
    # serializer_class = EmailVerificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        token = request.POST.get('token')

        # payload = jwt_decode_handler(token)
        user = get_object_or_404(User, id=request.user.id)
        if user is not None:
            JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
            client = JsonRpcClient(JSON_RPC_URL)
            # https://xrpl.org/xrp-testnet-faucet.html

            test_wallet = generate_faucet_wallet(client, debug=True)

            # Create an account str from the wallet
            test_account = test_wallet.classic_address

            test_xaddress = addresscodec.classic_address_to_xaddress(test_account, tag=12345, is_test_network=True)
            print("\nClassic address:\n\n", test_account)
            print("X-address:\n\n", test_xaddress)

            acct_info = AccountInfo(
                account=test_account,
                ledger_index="validated",
                strict=True,
            )
            xrp_response = client.request(acct_info)
            result = xrp_response.result

            XRPWallet.objects.get_or_create(user=user, xrp_public_address=test_account,
                                            xrp_balance=result["account_data"]["Balance"],
                                            xrp_sequence=result["account_data"]["Sequence"])

            return Response({'status': True, 'wallet': 'Successfully wallet added',  'data': result},
                            status=status.HTTP_200_OK)

        else:
            return Response({'status': True, 'wallet': 'something went wrong!'},
                            status=status.HTTP_200_OK)
