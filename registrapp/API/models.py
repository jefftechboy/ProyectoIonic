from django.db import models

# Create your models here.
class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    Correo = models.CharField(max_length=50,null=False)
    CodigoSeguridad = models.CharField(max_length=50,null=False)
    def __str__(self) -> str:
        return self.Correo
    
class SeguridadCodigos(models.Model):
    id = models.AutoField(primary_key=True)
    Correo = models.CharField(max_length=50,null=False)
    CodigoSeguridad = models.CharField(max_length=50,null=False)
    Telefono = models.CharField(max_length=50,null=False)
    def __str__(self) -> str:
        return self.Correo