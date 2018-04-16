#!/bin/bash

if [ $# -lt 1 ]
then 
    echo "Folder name (without /) expected as parameter"
else
    cd $1
    zip ../../iot_store/apps/$1.zip `ls`
fi