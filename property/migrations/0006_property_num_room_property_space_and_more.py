# Generated by Django 4.2.4 on 2023-12-18 14:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0005_alter_property_images'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='num_room',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='property',
            name='space',
            field=models.IntegerField(default=50, validators=[django.core.validators.MinValueValidator(50)]),
        ),
        migrations.AlterField(
            model_name='property',
            name='price',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(50)]),
        ),
    ]
