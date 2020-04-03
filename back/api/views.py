from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Cidade, Caso, Registro
from django.http import HttpResponse
import requests
from bs4 import BeautifulSoup

@api_view(['GET', 'POST'])
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
    # ac24horas
    page = requests.get('https://www.ac24horas.com/ultimas-noticias/')

    # Criando o objeto BeutifulSoup
    soup = BeautifulSoup(page.text, 'html.parser')

    # cards_noticias = soup.find(class_='mvp-blog-story-list')
    # Pegando <li> que contém os cards
    list_cards_noticias = soup.find_all("li", class_="mvp-blog-story-wrap left relative infinite-post")

    # Iterando nos cards
    resultado = []
    palavras_chaves = ["coronavírus", "covid-19"]
    count = 0
    
    for noticia in list_cards_noticias:
        noticia_soup = BeautifulSoup(noticia.prettify(), "html.parser")

        titulo = noticia_soup.find("h2")
        introducao = noticia_soup.find("p")
        imagem = noticia_soup.find("img", class_="mvp-reg-img lazy wp-post-image")["src"]
        url_noticia = noticia_soup.find("a")["href"]
        date = noticia_soup.find('span', class_='mvp-cd-date')

        for palavra_chave in palavras_chaves:
            if palavra_chave in titulo.text.lower() or palavra_chave in introducao.text.lower():
                resultado.append({
                    "titulo": titulo.text.strip(),
                    "introducao": introducao.text.strip(),
                    "imagem": imagem,
                    "url": url_noticia,
                    'date': date.text.strip()
                })

                count += 1

                break

        if count == 6:
            break

    return Response({'noticias' : resultado})
