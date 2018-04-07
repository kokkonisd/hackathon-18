def generate_html(city_list):
    html="<div>"

    for city in city_list:
        html+="<div>"+city["name"]+"<div>"

    html="<div>"

    print(html)

