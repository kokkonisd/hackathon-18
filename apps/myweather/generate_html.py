def generate_html(city_list):
    html="<div>"

    for city in city_list:
        html+="<div>"+city["name"] +" : "+city["weather"][0]["description"]+"<div>"

    html+="</div>"

    file=open("vue.html", "w")
    file.write(html)
    file.close