from rest_framework import serializers


# from accounts.models import User
# from accounts.serializers import ChildFullUserSerializer
# from beats.models import Songs, Comment
# from beats.serializers import ChildSongSerializer, CommentsSerializer


# class ActivityObjectRelatedField(serializers.RelatedField, ):
#
#     def _get_request(self):
#         try:
#             return self.context['request']
#         except KeyError:
#             raise AttributeError('GenericRelatedField have to be initialized with `request` in context')
#
#     def to_representation(self, value):
#         """
#         Serialize bookmark instances using a bookmark serializer,
#         and note instances using a note serializer.
#         """
#         if isinstance(value, Songs):
#             serializer = ChildSongSerializer(value, context=self.context)
#
#         elif isinstance(value, User):
#             serializer = ChildFullUserSerializer(value, context=self.context)
#         else:
#             raise Exception('Unexpected type of tagged object')
#
#         return serializer.data
#
#
# class FeaturedSerializer(serializers.ModelSerializer):
#     user = ChildFullUserSerializer(read_only=True)
#     target = ActivityObjectRelatedField(read_only=True)
#
#     class Meta:
#         model = Featured
#         fields = ['id', 'user', 'verb', 'verb_id', 'target']


class RedeemCoinsSerializer(serializers.Serializer):
    coins = serializers.IntegerField()
