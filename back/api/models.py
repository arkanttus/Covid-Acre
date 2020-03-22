from django.db import models
from django.utils import timezone

STATUS = (
    ('S', 'Suspeito'),
    ('C', 'Confirmado'),
    ('D', 'Descartado'),
    ('O', 'Óbito'),
    ('R', 'Recuperado'),
    ('N', 'Nenhum')
)

STATUS_DICT = {
    "S": "Suspeito",
    "C": "Confirmado",
    "D": "Descartado",
    "O": "Óbito",
    "R": "Recuperado",
    "N": "Nenhum"
}

class Cidade(models.Model):
    nome = models.CharField('Nome', max_length=60)

    class Meta:
        verbose_name = "Cidade"

    def __str__(self):
        return self.nome

class Caso(models.Model):
    status = models.CharField(max_length=3, choices=STATUS)
    cidade = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name='casos')
    data_update = models.DateTimeField(verbose_name="Última atualização")

    def __str__(self):
        return f"Caso {STATUS_DICT[self.status]} - {self.cidade.nome}" 

    def save(self, *args, **kwargs):
        status_antigo = "N"
        data_anterior = timezone.now()
        if self.pk:
            caso = Caso.objects.get(pk=self.pk)
            status_antigo = caso.status
            data_anterior = caso.data_update
        
        self.data_update = timezone.now()
        Registro(status_anterior=status_antigo, data_anterior=data_anterior, status_novo=self.status, cidade=self.cidade, data_novo=timezone.now()).save()    
        
        return super(Caso, self).save(*args, **kwargs)

class Registro(models.Model):
    status_anterior = models.CharField(max_length=3, choices=STATUS)
    data_anterior = models.DateTimeField()
    status_novo = models.CharField(max_length=3, choices=STATUS)
    data_novo = models.DateTimeField()
    cidade = models.ForeignKey(Cidade, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.cidade.nome}: De ({STATUS_DICT[self.status_anterior]}) para ({STATUS_DICT[self.status_novo]})"