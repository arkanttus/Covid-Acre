from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Cidade, Caso


@api_view(['GET', 'POST'])
def all_cities(request):
    cidades = dict()

    for cidade in Cidade.objects.prefetch_related('casos'):
        casos = [caso.status for caso in cidade.casos.all()]
        print(casos)
        cidades[cidade.nome] = {
            "suspeitos": casos.count('S'),
            "confirmados": casos.count('C'),
            "descartados": casos.count('D'),
            "recuperados": casos.count('R'),
            "obitos": casos.count('O'),
        }
        print(cidades)

    return Response(cidades)
