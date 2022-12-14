# Generated by Django 3.1.6 on 2021-02-09 18:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Blogs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('blog_title', models.CharField(max_length=500)),
                ('blog_slug', models.SlugField()),
                ('blog_body', models.TextField()),
                ('blog_image', models.ImageField(blank=True, upload_to='blogs/%Y/%m/%d/')),
                ('embedded_video_url', models.URLField()),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'blogs',
                'ordering': ('-created_at',),
            },
        ),
    ]
