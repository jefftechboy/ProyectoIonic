from django.db import models

# Create your models here.
class Usario(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45,null=False)
    apellido = models.CharField(max_length=50,default='S/A')
    edad = models.IntegerField()

    def __str__(self) -> str:
        return self.nombre
    
class Persona(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45,null=False)
    apellido = models.CharField(max_length=50,default='S/A')

    def __str__(self) -> str:
        return self.nombre + " " + self.apellido