from .models import Message
from .serializer import MessageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class MessagesList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print( " token " , request.user.id )
        messages = Message.objects.filter(receiver_id = request.user.id)
        serializer = MessageSerializer(messages, many=True)
        return Response({"message": "success", "messages": serializer.data, "status": 200}, status=200)
    
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "success", "messages": serializer.data, "status": 201}, status=201)
        return Response({"message": "error", "errors": serializer.errors, "status": 400}, status=400)  # Add error response for invalid data

