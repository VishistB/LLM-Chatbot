from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions, generics
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
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChatSerializer
    lookup_field = 'chat_id'

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        name = request.data.get("name", "Untitled Chat")
        chat = Chat.objects.create(user=request.user, name=name)
        return Response(ChatSerializer(chat).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'])
    def delete_chat(self, request, chat_id=None):
        """Deletes a chat instance."""
        try:
            chat = self.get_queryset().get(chat_id=chat_id)
            chat.delete()
            return Response({"message": "Chat deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Chat.DoesNotExist:
            return Response({"error": "Chat not found."}, status=status.HTTP_404_NOT_FOUND)


