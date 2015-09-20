var express = require ("express"),
app = express(),
MongoClient = require("mongodb").MongoClient,
ObjectId = require('mongodb').ObjectID,
http = require("http"),
request=require('request'); 
var users;

MongoClient.connect("mongodb://main:main1@ds051543.mongolab.com:51543/hackmit", function(err, db)
{
	console.log(err)
	if (err) throw err;
	users = db.collection("users");
	console.log(err);
	console.log(users);
	console.log(db);
});

app.set("port", process.env.PORT || 8080); 

app.get("/api/hardware/buzz", function(req, res){
	/*
	/api/hardware/buzz
	Physically toggles the lights and buzzing on the Particle Photon hardware device
	*/
	request.post(
	    'https://api.particle.io/v1/devices/1d0026000647343339373536/led?access_token=97bbe3755d84dc951179331beacf98cb93b4b6b0',
	    { form: { 'args': 'toggle' } },
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body)
	        }
		console.log(response);
		res.send("<b>Toggle Complete</b>");
	    }
	);
});

app.get("/api/test",function(req,res)
{
	users.find(function(err, cursor)
	{
		users.find().toArray(function(error,found){
			if (err) throw err;
			console.log("found");
			console.log(found);
			res.send(found);
			return found;
		})
	});	
});

// all variables in URL are ObjectIds. 
app.get("/friends/:user", function (req, res)
{
	users.find(function(err, cursor)
	{
		var query = {"_id": ObjectId(req.params.user)};
		users.find(query).toArray(function(err, found)
		{
			if (err) throw err;
			console.log("found");
			console.log(found);
			res.send(found);
			return found;
		});
	});
});

app.get("/", function (req, res)
{	
	console.log("hi");
	res.send("hello");
});

app.get("/alarms/:user", function(req, res)
{
	var query = {"_id": req.params.user};
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

http.createServer(app).listen(app.get("port"), function()
{
	console.log("Listening on port " + app.get("port"));
});
