# Generated by Django 3.1.4 on 2020-12-10 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_auto_20201210_0056'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='verification_code',
        ),
        migrations.RemoveField(
            model_name='user',
            name='verification_code_sent_at',
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(db_index=True, max_length=100, unique=True),
        ),
    ]