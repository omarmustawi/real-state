from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Property
from .serializer import PropertySerializer
from django.http import JsonResponse

# Create your views here.

# ====================== create property, get all property =====================
#  HERE I MAKE AUTHENTICATED CLASS FOR POST 
from rest_framework import permissions
from rest_framework.response import Response
class UnauthenticatedReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user and request.user.is_authenticated


class PropertyList(APIView):
    permission_classes = [UnauthenticatedReadOnly]
    def get(self, request):
        property_list = Property.objects.all()
        serializer = PropertySerializer(property_list, many=True)
        return Response({"property": serializer.data, "status": 200})
    
    def post(self, request):
        serializer = PropertySerializer(data=request.data)
        print("valid", serializer.is_valid() )
        if serializer.is_valid():
            serializer.save()
            return Response({"property": serializer.data, "message": "It is saved successfully", "status": 200})
        print(serializer.errors)
        return Response({"property": serializer.data, "message": "There is an error", "status": 400} )

# =========================== get property by id , update property , delete property =========================
class PropertyDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            return JsonResponse({"message": "This property is not found", "status": 400})

    def get(self, request, pk):
        property = self.get_object(pk)
        serializer = PropertySerializer(property)
        return JsonResponse({"property": serializer.data, "status": 200})

    def put(self, request, pk):
        property = self.get_object(pk)
        serializer = PropertySerializer(property, request.data)

        if request.user != property.adviser:
            return JsonResponse({"message": "You do not have permission to update this property", "status": 403})

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"property": serializer.data, "status": 200, "message": "It is updated successfully"})
        return JsonResponse({"property": serializer.errors, "status": 400, "message": "It is not updated "})

    def delete(self, request, pk):
        property = self.get_object(pk)
        serializer = PropertySerializer(property)

        if request.user != property.adviser and request.user.id != 1:
            return JsonResponse({"message": "You do not have permission to delete this property", "status": 403})
        property.delete()
        return JsonResponse({"property": serializer.data, "message": "It is deleted successfully", "status": 204})



# =========================== get my properties  =========================
from rest_framework.parsers import MultiPartParser, FormParser

class MyProperties(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request):
        properties_list = Property.objects.filter( adviser=request.user.id )
        serializer = PropertySerializer(properties_list, many=True)
        return Response({"properties": serializer.data, "message":  "Success", "status": 200})
    
