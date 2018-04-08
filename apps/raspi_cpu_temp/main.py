import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

headers = ['time', 'temp']
df = pd.read_csv('cpu_temp.csv', names=headers, sep=";", parse_dates=[0])

FONT = {'family': 'sans-serif', 'weight': 'normal', 'size': 16}

fig, ax = plt.subplots(figsize=(17,8))

plt.plot(df.time, df.temp, label='cpu-temperature')

plt.ylabel('Temperature °C', fontdict=FONT)

ax.set_frame_on(False)
plt.grid(True)
plt.legend(prop={'size': 16})
plt.savefig('./graph.png')
