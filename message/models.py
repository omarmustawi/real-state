from django.db import models
from user.models import CustomUser
# Create your models here.
class Message(models.Model):
    # sender = models.ForeignKey( CustomUser , on_delete=models.CASCADE)
    sender_email = models.EmailField(max_length=255, default="zitsmartengineer@gmail.com")
    sender_id = models.IntegerField(default=1)
    letter = models.CharField(max_length=500)
    receiver_id = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    is_readed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.client_email} - {self.client_at}'
    # def __str__(self):
    #     return f'{self.sender_email} - {self.created_at}'
