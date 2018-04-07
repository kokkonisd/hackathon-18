from picamera import PiCamera
from time import sleep
import datetime as dt

def take_picture(name='image.jpg'):
	path='/tmp/'
	camera = PiCamera()
	camera.rotation = 180

	camera.annotate_text = "Facebook Hackathon " + dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

	camera.start_preview()
	sleep(2)
	camera.capture(path + name)
	camera.stop_preview()




