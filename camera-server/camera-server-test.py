from flask import request
from flask import Flask, url_for

path = "/home/pi/image.png"

def gif_generate(nb_image):
	return "\n\nGENERATE\n\n"+ str(nb_image) + " images"

def gif_get_gif():
	print("\n\nGET GIF\n\n")
	return "/home/pi/image.png"



app = Flask(__name__)
@app.route('/gif/<nb_image>', methods = ['GET', 'POST'])
def gif(nb_image):
	if request.method == 'GET':
		return gif_get_gif()

	if request.method == 'POST':
		data = request.form
		print(data)
		nb_image_from_data = data['nb_image']
		return gif_generate(nb_image_from_data)


