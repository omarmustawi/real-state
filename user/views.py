# myapp/views.py
from rest_framework.authtoken.models import Token
from .models import CustomUser
from .serializers import UserSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# ================== get all users ===============================
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def userList(request):
    if request.method == 'GET':
        if not request.user.role:
            return JsonResponse({"message": "You do not have permission to dicover these data", "status": 403})
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse({"users": serializer.data})




# ====================== register user ========================
@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        is_database_empty = CustomUser.objects.count() == 0
        role_value = is_database_empty
        user_data = {**request.data, 'role': role_value}
        serializer = UserSerializer(data=user_data)
        print("mkcn" , serializer.is_valid() )
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "User registered successfully", "user": serializer.data, "staus": 201}, status=201)
        return JsonResponse({"error": serializer.errors, "status": 400 })




# ======================== login user ==============================
@api_view(['POST'])
def loginUser(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        user = CustomUser.objects.filter(email=email).first()

        if user is None:
            return JsonResponse({"user": "User not found!", "status": 200})
        # print( " check : " , check_password( password , user.password ) )
        # if check_password( password , user.password ):
        #     return JsonResponse({"user": "Successful login" , "status": 200  })
        # else:
        #     return JsonResponse({"user": "Incorrect password", "status": 200 })
        if password != user.password:
            return JsonResponse({"user": "Incorrect password", "status": 200})

        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({"user": {
            "full_name": user.full_name,
            "email": user.email,
            "id": user.id,
            "role": user.role
        }, "token": token.key, "message": "Successful login", "status": 200})
    



# ========================= user detail =======================================
@api_view(['DELETE', 'GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_update_delete_user(request, pk):
    try:
        user = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return JsonResponse({"user": "User not found", "status": 404})
    

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse({"user": serializer.data, "status": 200 })
    
    # elif request.method == 'PUT':
    #     serializer = UserSerializer(user, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse({"user": serializer.data, "message": "User updated successfully", "status": 200 })
    #     return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        if not request.user.role:
            return JsonResponse({"message": "You do not have permission to delete any user", "status": 403})
        
        if pk == 1:
            return JsonResponse({"message": "I can not delete User Admin", "status": 400})

        user.delete()
        return JsonResponse({"message": "User deleted successfully", "status": 204})

# ================================= search ===========================
from django.db import models
from django.db.models import Q


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def search_users(request):
    search_word = request.data.get('search')
    if not request.user.role:
        return JsonResponse({"message": "You don't have permission" , "status": 403 } )

    if not search_word:
        return JsonResponse({"message": "Search term is required"}, status=400)

    # Use Q objects for OR conditions on multiple fields
    users = CustomUser.objects.filter(
        Q(full_name__icontains=search_word) | Q(email__icontains=search_word)
    )

    serializers = UserSerializer(users, many=True)

    return JsonResponse({"message": "success", "users": serializers.data, "status": 200 })