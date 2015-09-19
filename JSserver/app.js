var express = require ("express"),
	app = express(),
	MongoClient = require("mongodb"),
	http = require("http");

var users;

MongoClient.connect("mongodb://localhost:27017", function(err, db)
{
	if (err) throw err;
	
	users = db.collection("users");
});

app.set("port", process.env.PORT || 8080);

// all variables in URL are ObjectIds. 
app.get("/friends/:user", function (req, res)
{
	var query = {"_id": user};

	users.find(query).toArray(function(err, found)
	{
		if (err) throw err;

		return found;
	});
});

app.get("/alarms/:user", function(req, res)
{
	var query = {"_id": user};
	var projection = {"_id": false, "alarms": true};

	users.find(query, projection).toArray(function(err, alarms)
	{
		if (err) throw err;
		return alarms;
	});
});

app.post("/friends/newFriend/:user/:newFriend", function(req, res)
{
	var query = {"_id": newFriend};
	users.find(query, function(err, doc)
	{
		if (err) throw err;
		query = {"_id": user};
		var operation = {$push: {"friends", doc["_id"]}};
		users.update(query, operation, function(err, doc)
		{
			if (err) throw err;
			return
			// do we need to return anything?
		});
	});
});

app.post("/alarms/newAlarm/:user/:year/:month/:day/:hour/:minute", function(req, res)
{
	var query = {"_id": user};
//incomplete	
});

http.createServer(app).listen(app.get("port"), function()
{
	console.log("Listening on port " + app.get("port"));
});
