from .models import *
from django.utils import timezone

def update_cities_from_block(lines, lines2):
    cities = Cidade.objects.all()
    for line in lines.split("\n"):
        for city in cities:
            if line.startswith(city.nome):
                new_line = line.replace(city.nome+" ", "").replace(".","")

                values = new_line.split(" ")
                city.confirmados = int(values[1])
                city.descartados = int(values[2])
                city.suspeitos = int(values[3])
                break

    for line in lines2.split("\n"):
        for city in cities:
            if line.startswith(city.nome):
                new_line = line.replace(city.nome+" ", "").replace(".","")

                values = new_line.split(" ")
                if values[3] != '-':
                    city.recuperados = int(values[3])
                else:
                    city.recuperados = 0

                if values[4] != '-':
                    city.obitos = int(values[4])
                else:
                    city.obitos = 0

                break

    for city in cities:
        city.save()

def populate():
    cidades = ["Acrelândia", "Assis Brasil", "Brasileia", "Bujari", "Capixaba", "Cruzeiro do Sul", "Epitaciolândia", "Feijó", "Mâncio Lima", "Manoel Urbano", "Jordão", "M. Thaumaturgo", "Plácido de Castro", "Porto Acre", "Porto Walter", "Rio Branco", "Rodrigues Alves", "Santa Rosa do Purus", "Sena Madureira", "Senador Guiomard", "Tarauacá", "Xapuri"]
    for c in cidades:
        cidade = Cidade(nome=c, suspeitos=0, confirmados=0, descartados=0, obitos=0, recuperados=0)
        cidade.save()

    Complemento(nome="Atualizado", valor=timezone.localtime(timezone.now()).strftime("%d/%m/%Y %H:%M")).save()