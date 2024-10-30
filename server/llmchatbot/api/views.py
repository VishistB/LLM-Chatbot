from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from langchain_huggingface import HuggingFaceEndpoint
import environ
from time import sleep

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
