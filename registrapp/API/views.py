from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *
# Create your views here.

class SeguridadCodigosViewSet(generics.ListCreateAPIView):
    serializer_class = SeguridadCodigosSerializer
    queryset = SeguridadCodigos.objects.all()

