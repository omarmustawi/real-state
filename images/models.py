# models.py
from django.db import models

class ImageModel(models.Model):
    image = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=255, blank=True, null=True)
