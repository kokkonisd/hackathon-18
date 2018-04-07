import os
import re

def generate_html():
    html = open('list.html', 'w')

    html.write("<div>")

    working_directory = os.getcwd()
    files = os.listdir("musiques")

    pattern = re.compile("^[a-zA-Z]+.mp3$")

    for f in files:
        if (pattern.match(f)):
            html.write("<div>"+f+"<div/>")

    html.write("</div>")

    html.close
