#! /usr/bin/env python3

import os

def play(music):
    os.system('ffplay musiques/'+music+' &')