import os
from django.core.exceptions import ValidationError

#
# from accounts.models import User
#
FILE_FORMATS = {
    "audio": ['mp3', 'mpa', 'oga', 'wma'],
    "image": ['jpeg', 'jpg', 'webp', 'gif', 'png', 'svg', ],
}


#
# PAID_FILE_FORMATS = {
#     "audio": ['mp3', 'mpa', 'oga', 'wma', 'wav'],
#     "image": ['jpeg', 'jpg', 'webp', 'gif', 'png', 'svg', ],
# }
#
#
# class FileExtensionValidator:
#     def __init__(self, file_type, user_field="user"):
#         self.file_type = file_type
#         self.user_field = user_field
#
#     def __call__(self, value):
#         user = User.objects.get(id=self.user_field)
#         subscription_badge = user.membership_plan.subscription_badge
#         ext = os.path.splitext(value.name)[1][1:]  # [0] returns path+filename
#         if subscription_badge:
#             if self.file_type == 'audio':
#                 max_file_size = 1024 * 1024 * 70  # 12MB
#                 if value.size > max_file_size:
#                     # raise ValidationError('Max file size is {} and your
#                     # file size is {}'.format(max_file_size, value.size))
#                     raise ValidationError('File too large. Size should not exceed 70 mb')
#             if self.file_type == 'image':
#                 max_file_size = 1024 * 1024 * 16  # 8MB
#                 if value.size > max_file_size:
#                     # raise ValidationError('Max file size is {} and your file
#                     # size is {}'.format(max_file_size, value.size))
#                     raise ValidationError('File too large. Size should not exceed 16 mb')
#
#             error_message = 'Unsupported File extension'
#             try:
#                 if not ext.lower() in PAID_FILE_FORMATS[self.file_type]:
#                     raise ValidationError(error_message)
#
#             except KeyError:
#                 raise ValidationError(error_message)
#
#         else:
#
#             if self.file_type == 'audio':
#                 max_file_size = 1024 * 1024 * 30  # 12MB
#                 if value.size > max_file_size:
#                     # raise ValidationError('Max file size is {} and your
#                     # file size is {}'.format(max_file_size, value.size))
#                     raise ValidationError('File too large. please  Size should not exceed 30 mb')
#             if self.file_type == 'image':
#                 max_file_size = 1024 * 1024 * 14  # 2MB
#                 if value.size > max_file_size:
#                     # raise ValidationError('Max file size is {} and your file
#                     # size is {}'.format(max_file_size, value.size))
#                     raise ValidationError('File too large. Size should not exceed 14 mb')
#
#             error_message = 'Unsupported File extension'
#             try:
#                 if not ext.lower() in FILE_FORMATS[self.file_type]:
#                     raise ValidationError(error_message)
#
#             except KeyError:
#                 raise ValidationError(error_message)
# # import os
# #
# # from django.core.exceptions import ValidationError
# #
# # FILE_FORMATS = {
# #     "audio": ['mp3', 'mpa', 'oga', 'wma', 'wav'],
# #     "image": ['jpeg', 'jpg', 'webp', 'gif', 'png', 'svg', ],
# #
# # }
# #
# #
class FileExtensionValidator(object):
    def __init__(self, file_type):
        self.file_type = file_type

    def __call__(self, value):

        ext = os.path.splitext(value.name)[1][1:]  # [0] returns path+filename
        if self.file_type == 'audio':
            max_file_size = 1024 * 1024 * 70  # 12MB
            if value.size > max_file_size:
                # raise ValidationError('Max file size is {} and your
                # file size is {}'.format(max_file_size, value.size))
                raise ValidationError('File too large. Size should not exceed 70 mb')
        if self.file_type == 'image':
            max_file_size = 1024 * 1024 * 12  # 4MB
            if value.size > max_file_size:
                # raise ValidationError('Max file size is {} and your file
                # size is {}'.format(max_file_size, value.size))
                raise ValidationError('File too large. Size should not exceed 12 mb')

        error_message = 'Unsupported File extension'
        try:
            if not ext.lower() in FILE_FORMATS[self.file_type]:
                raise ValidationError(error_message)

        except KeyError:
            raise ValidationError(error_message)
