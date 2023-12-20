from django.db import models
from user.models import CustomUser
from django.core.validators import MinValueValidator

# Create your models here.


class Property(models.Model):
    adviser = models.ForeignKey(
        CustomUser, related_name="properties", on_delete=models.CASCADE
    )
    type_deal = models.BooleanField()  # false => rent, true => sell
    # 0 => home 1 => land  2 => store or shope 3 => vill or palace
    type_property = models.IntegerField()
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=400)
    date = models.DateField(auto_now_add=True)
    price = models.IntegerField(
        validators=[MinValueValidator(50)],
        null=False,
        blank=False
    )
    space = models.IntegerField(validators=[MinValueValidator(50)], default=50 )
    num_room = models.IntegerField(null=True, blank=True)
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    is_alive = models.BooleanField(default=True)
    images = models.ImageField(upload_to='images/', null=True, blank=True)
