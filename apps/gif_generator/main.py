#! /usr/bin/env python3

import sys

def take_pictures(nb_images=5):
	image_number = 0
	while image_number < nb_images:
		sleep(1)
		image_name = 'image{0:04d}.jpg'.format(image_number)
    		camera.capture(image_name)
    		image_number += 1

for argument in sys.argv[1::]:
	parsed_arg = argument.split('=')
	if (len(parsed_arg) >= 1):
		arg = parsed_arg[0]
	if (len(parsed_arg) >= 2):
		value = parsed_arg[1]
	else:
		value=None

	if (arg=="take_pictures"):
		take_pictures(value)
		#generate_html(picture_path)





sys.stdout.flush()

