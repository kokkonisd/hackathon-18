from picamera import PiCamera, Color
from time import sleep
import datetime as dt
import numpy as np


from flask import request
from flask import Flask, url_for

camera = PiCamera()
camera.rotation = 180
camera.annotate_text_size = 92
camera.annotate_foreground = Color(r=255, g=255, b=255)
camera.annotate_background = Color(r=0, g=0, b=0)	


def take_picture(name='image.jpg'):
	#path='/home/pi/Desktop/'
	path = "static/"
	camera.annotate_text = "Facebook Hackathon " + dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

	camera.start_preview()
	sleep(1)
	camera.capture(path + name)
	camera.stop_preview()
	
	return path + name


def take_gif(number_images):
	#path='/home/pi/Desktop/'

	unique_id = ''.join([str(np.random.randint(10)) for i in range (20)])

	path = "static/" + unique_id
	camera.annotate_text = "Facebook Hackathon " + dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

	camera.start_preview()
	


	for ID in range(number_images):
	    sleep(1)
	    image_name = 'image{0:04d}.jpg'.format(ID)
	    camera.capture(path + image_name)
	
	camera.stop_preview()
	
	gif_name = path + "animation.gif"
	command_str = "convert -delay 50 -loop 0  -treedepth 4 " + path + "image*.jpg " + gif_name
	os.system(command_str)

	return gif_name


app = Flask(__name__)
@app.route('/one_picture/<name_image>', methods = ['GET'])
def gif(name_image):
	if request.method == 'GET':
		return take_picture(name_image)

@app.route('/one_gif/<number_images>', methods = ['GET'])
def gif(number_images):
	if request.method == 'GET':
		return take_gif(number_images)
