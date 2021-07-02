import os
from django.core.exceptions import ValidationError

FILE_FORMATS = {
    "audio": ['mp3', 'mpa', 'oga', 'wma', ],
    "image": ['jpeg', 'jpg', 'webp', 'gif', 'png', 'svg', ],
}


class FileExtensionValidator(object):
    def __init__(self, file_type):
        self.file_type = file_type

    def __call__(self, value):
        ext = os.path.splitext(value.name)[1][1:]  # [0] returns path+filename
        if self.file_type == 'audio':
            max_file_size = 1024 * 1024 * 12  # 12MB
            if value.size > max_file_size:
                # raise ValidationError('Max file size is {} and your
                # file size is {}'.format(max_file_size, value.size))
                raise ValidationError('File too large. Size should not exceed 12 mb')
        if self.file_type == 'image':
            max_file_size = 1024 * 1024 * 2  # 2MB
            if value.size > max_file_size:
                # raise ValidationError('Max file size is {} and your file
                # size is {}'.format(max_file_size, value.size))
                raise ValidationError('File too large. Size should not exceed 2 mb')

        error_message = 'Unsupported File extension'
        try:
            if not ext.lower() in FILE_FORMATS[self.file_type]:
                raise ValidationError(error_message)

        except KeyError:
            raise ValidationError(error_message)
