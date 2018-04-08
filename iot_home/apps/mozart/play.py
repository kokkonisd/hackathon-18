#! /usr/bin/env python3

import os
import sys


def play(music='solace.mp3'):
    songs_directory_path = "../apps/mozart/musiques/"
    command_str = "cvlc " + songs_directory_path + music
    os.system(command_str)

