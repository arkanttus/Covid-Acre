from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Cidade, Caso


@api_view(['GET', 'POST'])
def all_cities(request):
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

    return Response(cidades)
