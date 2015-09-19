#from flask import *
#from app import app
#from flask import Response
import json
import datetime
from pymongo import MongoClient

client = MongoClient("colab-sbx-280.oit.duke.edu", "27017")
db = client.hackmit

users = db.users


#returns list of user's friends that are allowed to wake the user up
#assuming <user> is the ObjectId
@app.route('/friends/<user>', methods = ["GET"])
def getWakeupFriends(user):
	cursor = users.find({"ObjectId": user })
	friends = []
	for doc in cursor:
		friends = friends.append(doc)
	return friends

#returns list of user's alarms
@app.route("/alarms/<user>", methods = ["GET"])
def getAlarms(user):
	cursor = users.find({"ObjectId": user},{"ObjectId": false, "alarms": true})
	alarms = []
	for doc in cursor:
		alarms = alarms.append(doc)
	return alarms
	



#####
# HOW DO WE SEND PUSH NOTIFICATIONS?
#####

#sends push notifications to the list of wakeup_friends letting them know that <user> is still sleeping and should be woken.

#@app.route("/inform/still_sleeping/<user>")


#@app.route("send/buzz/<user>")


