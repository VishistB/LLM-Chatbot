from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse

# Create your views here.

class endpointview(APIView):
    def get(self,request):
        return Response({"Rest-Api running : successful"},status=status.HTTP_200_OK)