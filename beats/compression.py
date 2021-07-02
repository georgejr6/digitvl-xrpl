from io import BytesIO

from PIL import Image
from django.core.files import File


def compress(image):
    im = Image.open(image)
    # create a BytesIO object
    im_io = BytesIO()
    # save image to BytesIO object
    new_image = im.resize((250, 250))
    d = new_image.convert('RGB')
    d.save(im_io, 'JPEG', quality=95, optimize=True)
    # create a django-friendly Files object
    new_image = File(im_io, name=image.name)
    return new_image


def compress_cover(image):
    im = Image.open(image)
    # create a BytesIO object
    im_io = BytesIO()
    # save image to BytesIO object
    new_image = im.resize((900, 300))
    d = new_image.convert('RGB')
    d.save(im_io, 'JPEG', quality=90, optimize=True)
    # create a django-friendly Files object
    new_image = File(im_io, name=image.name)
    return new_image