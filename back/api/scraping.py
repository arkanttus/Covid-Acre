import requests
from bs4 import BeautifulSoup

def ac24hScrap(qnt):
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

        if count == qnt:
            break


    return resultado

def g1Scrap():
    pass


def contilScrap():
    pass