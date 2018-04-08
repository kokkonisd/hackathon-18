#! /usr/bin/env python3

from play import play
from generate_html import generate_html
import sys

for data in sys.argv[1::]:
    parsed_data = data.split('=')
    if (len(parsed_data) >= 1):
        arg = parsed_data[0]
        if (len(parsed_data) >= 2):
            value = parsed_data[1]
        else:
            value=None

        if (arg=="html"):
            generate_html()
        elif (arg=="play"):
            play(value)

#sys.stdout.flush()