# Generated by Django 3.1.1 on 2020-10-01 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, default='users/%Y/%m/%d/avatar.png', upload_to='users/%Y/%m/%d/'),
        ),
    ]