# Generated by Django 4.2.4 on 2023-12-13 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0005_message_is_readed'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='sender_id',
            field=models.IntegerField(default=1),
        ),
    ]