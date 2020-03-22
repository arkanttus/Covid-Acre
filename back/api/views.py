from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cidade, Caso

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

def multi_caso_add(request):
    return render(request, "admin/change_form_x.html")
