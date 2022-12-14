# Generated by Django 3.1.1 on 2020-10-15 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_profile_cover_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='cover_photo',
            field=models.ImageField(blank=True, default='media/users/avatar.png', upload_to='users/%Y/%m/%d/'),
        ),
    ]
