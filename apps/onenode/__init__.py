import sys
import os


print(os.path.dirname(os.path.abspath(__file__)))
print("Path : " ) 
print(sys.path)
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
print("New path : " ) 
print(sys.path)