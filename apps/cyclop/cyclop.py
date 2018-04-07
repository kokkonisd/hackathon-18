from picamera import PiCamera, Color
from time import sleep
import datetime as dt

def take_picture(name='image.jpg'):
	#path='/home/pi/Desktop/'
	path = "./"
	camera = PiCamera()
	camera.rotation = 180
	camera.annotate_text_size = 92
	camera.annotate_foreground = Color(r=255, g=255, b=255)
	camera.annotate_background = Color(r=0, g=0, b=0)	
	camera.annotate_text = "Facebook Hackathon " + dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

	camera.start_preview()
	sleep(2)
	camera.capture(path + name)
	camera.stop_preview()
	
	return path + name




if __name__ == "__main__":
    # execute only if run as a script
    take_picture()
