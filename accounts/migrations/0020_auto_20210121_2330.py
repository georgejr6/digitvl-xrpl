# Generated by Django 3.1.5 on 2021-01-21 18:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0019_auto_20210121_0125'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='slug',
            new_name='username_slug',
        ),
    ]
