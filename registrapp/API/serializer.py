from .models import *
from rest_framework import serializers

class SeguridadCodigosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__" # __all__


