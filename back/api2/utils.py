from .models import *
from django.utils import timezone

def update_cities_from_block(lines):
    cities = Cidade.objects.all()

    for line in lines.replace(".","").split("\n"):
        for city in cities:
            if line.startswith(city.nome):
                new_line = line.replace(city.nome+" ", "")

                values = new_line.split(" ")
                city.confirmados = int(values[1])
                city.descartados = int(values[2])
                city.suspeitos = int(values[3])
                if len(values) == 5:
                    city.obitos = int(values[4])
                city.save()
                break

def populate():
    cidades = ["Acrelândia", "Assis Brasil", "Brasileia", "Bujari", "Capixaba", "Cruzeiro do Sul", "Epitaciolândia", "Feijó", "Mâncio Lima", "Manoel Urbano", "Jordão", "M. Thaumaturgo", "Plácido de Castro", "Porto Acre", "Porto Walter", "Rio Branco", "Rodrigues Alves", "Santa Rosa do Purus", "Sena Madureira", "Senador Guiomard", "Tarauacá", "Xapuri"]
    for c in cidades:
        cidade = Cidade(nome=c, suspeitos=0, confirmados=0, descartados=0, obitos=0)
        cidade.save()

    Complemento(nome="Recuperados", valor=0).save()
    Complemento(nome="Atualizado", valor=timezone.now().strftime("%d/%m/%Y %H:%M"))