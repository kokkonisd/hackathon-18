from picamera import PiCamera
from time import sleep
import datetime as dt


camera = PiCamera()
camera.rotation = 180

camera.annotate_text = "Facebook Hackathon " + dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

camera.start_preview()
sleep(2)
camera.capture('/home/pi/Desktop/image.jpg')
camera.stop_preview()
