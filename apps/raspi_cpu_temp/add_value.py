import os
import time


command_str = "/opt/vc/bin/vcgencmd measure_temp"



def get_measure():
	temp = os.popen(command_str).read()
	t = temp.split('=')[1]
	t = t.split("'")[0]

	measure = time.strftime('%X %x %Z') + ";" + str(t) + "\n"

	with open('/home/pi/hackathon-18/apps/raspi_cpu_temp/cpu_temp.csv','a') as f:
	        f.write(str(measure))

get_measure()	# 00
time.sleep(15)
get_measure()	# 15
time.sleep(15)
get_measure()	# 30
time.sleep(15)
get_measure()	# 45