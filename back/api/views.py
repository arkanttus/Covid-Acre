from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Cidade, Caso
from .serializers import CidadeSerializer

class CidadeList(generics.ListAPIView):
    queryset = Cidade.objects.prefetch_related('casos')
    serializer_class = CidadeSerializer

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
'''
@api_view(['GET', 'POST'])
def all_cities(request):
    cidades = {}

    for cidade in Cidade.objects.all():
        casos_cidade = Caso.objects.filter(cidade=cidade)
        print(casos_cidade)
        cidades[cidade.nome] = {
            "suspeitos": casos_cidade.filter(status="S").count(),
            "confirmados": casos_cidade.filter(status="C").count(),
            "descartados": casos_cidade.filter(status="D").count(),
            "recuperados": casos_cidade.filter(status="R").count(),
            "obitos": casos_cidade.filter(status="O").count(),
        }

    return Response(cidades)
'''
def multi_caso_add(request):
    return render(request, "admin/change_form_x.html")
