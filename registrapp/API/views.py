from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *
# Create your views here.
class UsuarioViewSet(generics.ListCreateAPIView):
    queryset = Usario.objects.all()
    serializer_class = UsuarioSerializer


class PersonaViewSet(generics.ListCreateAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer 