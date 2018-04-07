#! /usr/bin/env python3

import sys
from time import sleep
from picamera import PiCamera, Color

def take_pictures(nb_images=5):
    camera = PiCamera()
    camera.rotation = 180
    camera.annotate_text_size = 92
    camera.annotate_foreground = Color(r=255, g=255, b=255)
    camera.annotate_background = Color(r=0, g=0, b=0)       
    camera.annotate_text = "Facebook Hackathon " + dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    camera.start_preview()
    image_number = 0
    while image_number < int(nb_images):
        sleep(1)
        image_name = 'image{0:04d}.jpg'.format(image_number)
	camera.capture(image_name)
        image_number += 1
    camera.stop_preview()

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

