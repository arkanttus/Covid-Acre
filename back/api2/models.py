from django.db import models

class Cidade(models.Model):
    nome = models.CharField(max_length=60)
    suspeitos = models.IntegerField()
    confirmados = models.IntegerField()
    descartados = models.IntegerField()
    recuperados = models.IntegerField()
    obitos = models.IntegerField()

    def __str__(self):
        return self.nome

class Complemento(models.Model):
    nome = models.CharField(max_length=30)
    valor = models.CharField(max_length=30)

    def __str__(self):
        return self.nome