'''
Retorna um hexadecimal, dado uma porcentagem Relation e o range maximo
da cor Percent_Color
'''
def make_color(relation, percent_color):
    calculate_hex = hex(round(relation * percent_color))
    splits = calculate_hex[2:]
    return '0' + splits if len(splits) == 1 else splits


'''
Calcula a porcentagem de casos em cada municipio em relação ao estado e 
configura as devidas cores de acordo com essa porcentagem 
'''
def color_cities(cities):
    total = cities.pop('Acre')

    for city_key in cities:
        city = cities[city_key]
        color = "#EEE"

        if city['confirmados'] > 0:
            relation = 1 - (city['confirmados'] / total['confirmados'])
            
            #calculate the values to green and blue acording with the relation value
            split_color = make_color(relation, 100)

            color = "#cc" + split_color + split_color

        elif city['suspeitos'] > 0 or city['descartados'] > 0:
            city_values = city['suspeitos'] + city['descartados']
            total_values = total['suspeitos'] + total['descartados']

            relation = 1 - (city_values / total_values)

            split_color = make_color(relation, 120)

            color = "#ffff" + split_color
        
        city['color'] = color
    
    cities['Acre'] = total
    
    return cities

