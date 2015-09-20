var express = require ("express"),
	app = express(),
	MongoClient = require("mongodb"),
	http = require("http");

var users;
MongoClient.connect("mongodb://localhost:27017/", function(err, db)
//MongoClient.connect("mongodb://colab-sbx-280.oit.duke.edu:27017/hackmit?connectTimeoutMS=300000", function(err, db)
{
	if (err) throw err;
	users = db.collection("users");
});
app.set("port", process.env.PORT || 8000);


////////////////////
/// Buzz...

app.get("/buzz", function(req, res)
{
	res.send("{'message': 'buzz'}");
});


////////////////////





app.get("/api/users",function(req,res) 
{
	res.send(users.find().toArray());
});

// all variables in URL are ObjectIds. 
app.get("/friends/:user", function (req, res)
{
	console.log("hello");
	console.log(req.params.user);

	var query = {"_id": req.params.user};

	console.log("users");
	console.log(users);
		
	users.findOne(query, function(err, doc)
	{
		if (err) throw err;
		console.log(JSON.stringify(doc));
		res.send(JSON.stringify(doc));
	});
	/*
	var result;
	cursor.each(function(err, doc)
	{
		result = doc;
	});
	console.log(result);
	res.send(users.find(query));
*/

/*	users.find(query, function(err, found)
	{
		if (err) throw err;

		res.send(found);
	});
*/
});


app.get("/", function (req, res)
{
	
		console.log("hi");
		res.send("hello");

});

app.get("/alarms/:user", function(req, res)
{
	var query = {"_id": user};
	var projection = {"_id": false, "alarms": true};

	users.find(query, projection, function(err, alarms)
	{
		if (err) throw err;
		res.send(alarms);
	});
});

app.post("/friends/newFriend/:user/:newFriend", function(req, res)
{
	var query = {"_id": newFriend};
	users.find(query, function(err, doc)
	{
		if (err) throw err;
		query = {"_id": user};
		var operation = {$push: {"friends": doc["_id"]}};
		users.update(query, operation, function(err, doc)
		{
			if (err) throw err;
			return;
			// do we need to return anything?
		});
	});
});

app.post("/alarms/newAlarm/:user/:year/:month/:day/:hour/:minute", function(req, res)
{
	var query = {"_id": user};
	var alarm = new Date(year, month, day, hour, minute);
	
	users.find(query, function(err, doc)
	{
		if (err) throw err;
		var operation = {$push: {"alarms": alarm}};
		users.update(query, operation, function(err, doc)
		{
			if (err) throw err;
			return;
		});
	});
});

app.get("/", function(req, res)
{
	console.log("hi");
	res.send("hello");
});

http.createServer(app).listen(app.get("port"), function()
{
	console.log("Listening on port " + app.get("port"));
});
