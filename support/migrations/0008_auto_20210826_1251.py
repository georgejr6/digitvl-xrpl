# Generated by Django 3.1.6 on 2021-08-26 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0007_auto_20210826_1251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='support',
            name='issue_resolved',
            field=models.CharField(choices=[('1', 'unresolved'), ('2', 'Pending'), ('3', 'resolved')], default='2', max_length=10),
        ),
    ]
