import os
import time


command_str = "/opt/vc/bin/vcgencmd measure_temp"

temp = os.popen(command_str).read()
t = temp.split('=')[1]
t = t.split("'")[0]

measure = time.strftime('%X %x %Z') + ";" + str(t) + "\n"

with open('/home/pi/hackathon-18/apps/raspi_cpu_temp/cpu_temp.csv','a') as f:
        f.write(str(measure))

