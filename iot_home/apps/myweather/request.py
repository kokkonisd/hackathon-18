import requests
import json


def request(city):
    r=requests.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=8755d341b4b6e0dcd22ae99fa27bc64b")
    weather=json.loads(r.text)
    return (weather)

