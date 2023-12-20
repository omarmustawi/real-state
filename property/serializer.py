from rest_framework import serializers
from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    # images = serializers.ImageField(use_url=False)
    class Meta:
        model = Property
        fields = ['id' , 'adviser', 'type_deal', 'type_property', 'phone',
                  'description', 'date', 'price', 'space', 'num_room', 'address', 'city', 'is_alive', "images"]
