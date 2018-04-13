from parser.html_parser import parse_html

def get_thermometer(tmp):
    if (tmp>25):
        return "full"
    elif (tmp>10):
        return "quarter"
    else:
        return "empty"

icon={"Clear": "sun-o", "Rain": "umbrella", "Clouds": "cloud", "Sun": "sun-o"}
def get_icon(weather):
    if (not weather in icon):
        return "cloud"
    else:
        return icon[weather]

def generate_html(city_list, path):
    
    html=""

    context={"city_list":city_list, "town":{}}

    towns=[]

    for city in city_list:
        towns.append(Town(city["name"],city["main"]["temp"]-273.15,str(0.1*int(10*(city["main"]["temp"]-273.15))),get_icon(city["weather"][0]["main"]),city["weather"][0]["main"]))
 
    context["city_list"]=towns

    print(context)
    template=open(path + "index.html","r")
    file=open(path + "vue.html", "w")
    file.write(parse_html(template.read(),context))
    file.close()
    template.close()

class Town:
    def __init__(self,name,thermometer,temp,icon,weather):
        self.name=name
        self.thermometer=thermometer
        self.temp=temp
        self.icon=icon
        self.weather=weather