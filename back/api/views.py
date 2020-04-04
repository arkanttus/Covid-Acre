from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Cidade, Caso, Registro
from django.http import HttpResponse
from .scraping import ac24hScrap


@api_view(['GET'])
def all_cities(request):
    ultimo_registro = Registro.objects.order_by('-data_novo')[0]
    ultima_att = ultimo_registro.data_novo

    cidades = dict()

    cidades['Acre'] = {
        'suspeitos': 0,
        'confirmados': 0,
        'descartados': 0,
        'recuperados': 0,
        'obitos': 0
    }

    for cidade in Cidade.objects.prefetch_related('casos'):
        casos = [caso.status for caso in cidade.casos.all()]

        s,c,d,r,o = casos.count('S'), casos.count('C'), casos.count('D'), casos.count('R'),casos.count('O')

        cidades[cidade.nome] = {
            "suspeitos": s,
            "confirmados": c,
            "descartados": d,
            "recuperados": r,
            "obitos": o,
        }
       
        cidades['Acre']['suspeitos'] += s
        cidades['Acre']['confirmados'] += c
        cidades['Acre']['descartados'] += d
        cidades['Acre']['recuperados'] += r
        cidades['Acre']['obitos'] += o

    return Response({'Cidades': cidades, 'Update': ultima_att})


@api_view(['GET'])
def noticias_web_scraping(request):
    noticias = ac24hScrap(6)

    return Response({'noticias' : noticias})
