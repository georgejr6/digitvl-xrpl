# Generated by Django 3.2.15 on 2022-09-12 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xrpwallet', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='xrpwallet',
            name='xrp_token_earn',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
    ]
