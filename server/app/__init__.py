#will eventually be run from colab-sbx-280.oit.duke.edu
#port 27017 (I think...? is that the default?)


#from flask import Flask
#from flask.ext.pymongo import PyMongo
#app=Flask(__name__)


from views import *
from pymongo import MongoClient

client = MongoClient("colab-sbx-280.oit.duke.edu", "27017")
db = client.hackmit


"""
MONGODB_HOST = "localhost"
MONGODB_PORT = 27017

app.config["MONGO_HOST"] = "colab-sbx-280.oit.duke.edu"
app.config["MONGO_PORT"] = 27017
app.config["MONGO_DBNAME"] = "hackmit"
mongo = PyMongo(app)
"""


#not sure what this line does, will ignore for now.. O:)
#app.config.from_object(__name__)

app.run()

