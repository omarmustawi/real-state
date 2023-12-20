# myapp/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    # password = models.CharField(max_length=255)
    username = None
    role = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


