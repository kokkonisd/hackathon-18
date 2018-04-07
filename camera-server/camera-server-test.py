from picamera import PiCamera, Color
from time import sleep
import datetime as dt


from flask import request
from flask import Flask, url_for

# path = "/home/pi/image.png"

# def gif_generate(nb_image):
# 	return "\n\nGENERATE\n\n"+ str(nb_image) + " images"

# def gif_get_gif():
# 	print("\n\nGET GIF\n\n")
# 	return "/home/pi/image.png"

# def take_picture():

def take_picture(name='image.jpg'):
	#path='/home/pi/Desktop/'
	path = "./static/"
	camera = PiCamera()
	camera.rotation = 180
	camera.annotate_text_size = 92
	camera.annotate_foreground = Color(r=255, g=255, b=255)
	camera.annotate_background = Color(r=0, g=0, b=0)	
	camera.annotate_text = "Facebook Hackathon " + dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

	camera.start_preview()
	sleep(1)
	camera.capture(path + name)
	camera.stop_preview()
	
	return path + name

app = Flask(__name__)
@app.route('/gif/<name_image>', methods = ['GET'])
def gif(name_image):
	if request.method == 'GET':
		return take_picture(name_image)

	# if request.method == 'POST':
	# 	data = request.form
	# 	print(data)
	# 	nb_image_from_data = data['nb_image']
	# 	return take_picture(nb_image_from_data)


