#!/bin/bash

#Append the path of onenode package to the pythonpath int the file ~/.bashrc
echo '#Add the onenode python package to the default pythonpath ' >> ~/.bashrc
echo 'export PYTHONPATH=$PYTHONPATH:'`pwd`'/onenode' >> ~/.bashrc
echo '' >> ~/.bashrc