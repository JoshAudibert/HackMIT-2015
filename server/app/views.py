from flask import *
from app import app
from flask import Response
import json


@app.route('/')
def hello_world():
    return 'Hello World!'



