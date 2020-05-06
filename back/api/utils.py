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
            calculate_g_b = hex(round(relation * 196))
            split_color = calculate_g_b[2:]

            color = "#cc" + split_color + split_color

        elif city['suspeitos'] > 0 or city['descartados'] > 0:
            city_values = city['suspeitos'] + city['descartados']
            total_values = total['suspeitos'] + total['descartados']

            relation = 1 - (city_values / total_values)

            calculate_b = hex(round(relation * 90))
            split_color = calculate_b[2:]

            color = "#ffff" + split_color
        
        city['color'] = color
    
    cities['Acre'] = total
    
    return cities