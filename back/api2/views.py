from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Cidade, Complemento
from .utils import update_cities_from_block
from api.utils import color_cities
from django.http import HttpResponse
from django.shortcuts import render
from .forms import ValoresForm
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.db.models import Sum

@api_view(['GET'])
def all_cities(request):
    ultima_att = Complemento.objects.get(nome="Atualizado").valor

    cidades = dict()

    cidades['Acre'] = {
        'suspeitos': 0,
        'confirmados': 0,
        'descartados': 0,
        'recuperados': 0,
        'obitos': 0
    }

    for cidade in Cidade.objects.all():
        
        cidades[cidade.nome] = {
            "suspeitos": cidade.suspeitos,
            "confirmados": cidade.confirmados,
            "descartados": cidade.descartados,
            "recuperados": cidade.recuperados,
            "obitos": cidade.obitos,
        }
       
        cidades['Acre']['suspeitos'] += cidade.suspeitos
        cidades['Acre']['confirmados'] += cidade.confirmados
        cidades['Acre']['descartados'] += cidade.descartados
        cidades['Acre']['recuperados'] += cidade.recuperados
        cidades['Acre']['obitos'] += cidade.obitos

    cidades = color_cities(cidades)

    return Response({'Cidades': cidades, 'Update': ultima_att})

@login_required(login_url="/admin/")
def atualizar_casos(request):
    if request.POST:
        form = ValoresForm(request.POST)
        if form.is_valid():
            update_cities_from_block(form.cleaned_data['conteudo'], form.cleaned_data['conteudo2'])
            atualizado = Complemento.objects.get(nome="Atualizado")
            atualizado.valor=timezone.now().strftime("%d/%m/%Y %H:%M")
            atualizado.save()

            return HttpResponse('Atualizado!')
        else:
            return HttpResponse('Deu ruim!')
    else:
        form = ValoresForm()
        return render(request, "set.html", { 'form': form })

