#8755d341b4b6e0dcd22ae99fa27bc64b
#http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={8755d341b4b6e0dcd22ae99fa27bc64b} 

#! /usr/bin/env python3

from generate_html import generate_html
from request import request
import sys

path="../apps/myweather/"

def render():
    file=open(path+"cities.txt","r")
    l=file.read().split(',')
    cities=[]
    print(l)
    for city in l:
        if (city!=""):
            cities.append(request(city))
    generate_html(cities, path)
    file.close()

for data in sys.argv[1::]:
    parsed_data = data.split('=')
    if (len(parsed_data) >= 1):
        arg = parsed_data[0]
        if (len(parsed_data) >= 2):
            value = parsed_data[1]
        else:
            value=None

        if (arg=="html"):
            render()

        if (arg=="add"):
            file=open(path+"cities.txt","a")
            file.write(value+",")
            file.close()
            render()

        if (arg=="remove"):
            file=open(path+"cities.txt","r")
            l=file.read().split(',')
            file.close()
            file=open(path+"cities.txt","w")
            new_text=""
            for city in l:
                if (city!=value and city!=""):
                    new_text+=city+","
            file.write(new_text)
            file.close()
            render()
        
    