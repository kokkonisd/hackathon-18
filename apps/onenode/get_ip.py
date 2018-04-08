import requests
import json

def ip_by_name(device_name):
    """return a dictionary that contain the name, ip and type"""
    r=requests.get("http://localhost:5000/getdeviceip?devicename="+device_name)
    devices=json.loads(r.text)
    return (devices)

def ip_by_signal(signal):
    """return a dictionary that contain the name, ip and type"""
    r=requests.get("http://localhost:5000/getlistenersof?signal="+signal)
    devices=json.loads(r.text)
    return (devices)

def ip_by_type(type):
    """return a dictionary that contain the name, ip and type"""
    r=requests.get("http://localhost:5000/getalloftype?type="+type)
    devices=json.loads(r.text)
    return (devices)
