#! /usr/bin/env python3

from generate_html import generate_html
import requests
import sys

# connected camera server
server_address = "http://192.168.1.10:5000/"

for argument in sys.argv[1::]:
	parsed_arg = argument.split('=')
	if (len(parsed_arg) >= 1):
		arg = parsed_arg[0]
	if (len(parsed_arg) >= 2):
		value = parsed_arg[1]
	else:
		value=None

	if (arg=="take_picture"):
		r = requests.get(server_address + "one_picture/"+str(value))
		image_link = server_address + r.text
		generate_html(image_link)
sys.stdout.flush()





