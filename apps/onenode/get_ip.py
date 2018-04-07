import requests
import json

def ip_by_name(device_name):
    """Return the device ip"""
    r=requests.get("http://localhost:5000/listenrequest?name="+device_name)
    return (r.text)

def ip_by_signal(signal):
    """return a dictionary that contain the name, ip and type"""
    r=requests.get("http://localhost:5000/listenrequest?signal="+signal)
    devices=json.loads(r.text)
    return (devices)

def ip_by_type(type):
    """return a dictionary that contain the name, ip and type"""
    r=requests.get("http://localhost:5000/listenrequest?type="+type)
    devices=json.loads(r.text)
    return (devices)
