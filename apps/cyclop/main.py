#! /usr/bin/env python3

from generate_html import generate_html
from cyclop import take_picture
import sys

for argument in sys.argv[1::]:
    parsed_arg = argument.split('=')
    if (len(parsed_arg) >= 1):
        arg = parsed_arg[0]
        if (len(parsed_arg) >= 2):
            value = parsed_arg[1]
        else:
            value=None

        if (arg=="html"):
            generate_html()
        elif (arg=="take_picture"):
            take_picture(path=value)

sys.stdout.flush()

