from rest_framework import serializers
from .models import Message
from django.contrib.auth import get_user_model
from user.serializers import UserSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender_email' , 'sender_id', 'letter', 'receiver_id', 'created_at' , 'is_readed' ]