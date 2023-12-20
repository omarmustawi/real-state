from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ImageModel
from .serializers import ImageModelSerializer
# Create your views here.



class ImageUploadView(generics.CreateAPIView):
    queryset = ImageModel.objects.all()
    serializer_class = ImageModelSerializer
    parser_classes = (MultiPartParser, FormParser)

class ImageView(generics.RetrieveAPIView):
    queryset = ImageModel.objects.all()
    serializer_class = ImageModelSerializer