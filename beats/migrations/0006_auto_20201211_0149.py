# Generated by Django 3.1.4 on 2020-12-10 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beats', '0005_auto_20201208_1715'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='slug',
            field=models.SlugField(default=1, max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='playlist',
            name='created',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
    ]