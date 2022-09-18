# Generated by Django 3.1.6 on 2021-08-13 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Advertisement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('description', models.CharField(max_length=255)),
                ('advertisement_image', models.ImageField(upload_to='ads/', verbose_name='Advertisement Image')),
                ('advertisement_url', models.URLField(help_text='use to redirect to the ad detail page', verbose_name='Advertisement Url')),
                ('approve', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name_plural': 'Advertisements',
            },
        ),
    ]