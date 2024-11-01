from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from django.http import HttpResponse
from langchain_huggingface import HuggingFaceEndpoint
import environ
from time import sleep
from .serializers import ChatSerializer, MessageSerializer, RegisterSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from .models import Chat, Message
from rest_framework.permissions import AllowAny

env = environ.Env()
# environ.Env.read_env()

# Create your views here.

class endpointview(APIView):
    def get(self,request):
        return Response({"Rest-Api running : successful"},status=status.HTTP_200_OK)
    

class PromptResponseView(APIView):
    def post(self, request):
        try:
            prompt = request.data.get('prompt')
            if not prompt:
                return Response({"error": "No prompt provided"}, status=status.HTTP_400_BAD_REQUEST)
            
            HUGGINGFACE_API_KEY = env('HUGGINGFACE_API_KEY')
            repo_id="mistralai/Mistral-7B-Instruct-v0.3"
            llm=HuggingFaceEndpoint(repo_id=repo_id,max_length=128,temperature=0.7,api=HUGGINGFACE_API_KEY)
            ans=llm.invoke(prompt)
            return Response({"response": ans}, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        chat = self.get_object()
        messages = Message.objects.filter(chat=chat)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
