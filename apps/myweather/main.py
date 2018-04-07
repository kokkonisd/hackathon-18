#8755d341b4b6e0dcd22ae99fa27bc64b
#http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={8755d341b4b6e0dcd22ae99fa27bc64b} 

#! /usr/bin/env python3

from generate_html import generate_html
from request import request
import sys

for data in sys.argv[1::]:
    parsed_data = data.split('=')
    if (len(parsed_data) >= 1):
        arg = parsed_data[0]
        if (len(parsed_data) >= 2):
            value = parsed_data[1]
        else:
            value=None

        

sys.stdout.flush()