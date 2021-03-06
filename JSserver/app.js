var express = require ("express"),
app = express(),
MongoClient = require("mongodb").MongoClient,
ObjectID = require('mongodb').ObjectID,
http = require("http"),
request=require('request') 
var users;
var events=require('events')
var eventEmitter=new events.EventEmitter();

MongoClient.connect("mongodb://localhost:27017/", function(err, db)
//MongoClient.connect("mongodb://colab-sbx-280.oit.duke.edu:27017/hackmit?connectTimeoutMS=300000", function(err, db)
{
	console.log(err)
	if (err) throw err;
	users = db.collection("users");
	console.log(err);
	console.log(users);
	console.log(db);
});

var sendFunc;
app.set("port", process.env.PORT || 8080); 
app.use(express.static('static'));
app.get("/stream", function(req,res){
	res.writeHead(200, { 'Content-Type': 'text/event-stream' });

function writeHandler(){
		res.write('data: hello\n\n');
		console.log("written");
};
	eventEmitter.on('boom',writeHandler);	
});
app.get("/send",function(req,res){
	eventEmitter.emit('boom');
	
});

// BEGIN ROUTES
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
app.set("port", process.env.PORT || 8000);


////////////////////
/// Buzz...

app.get("/buzz", function(req, res)
{
	res.send("{'message': 'buzz'}");
});


////////////////////

app.get("/gotit", function(req, res)
{
	console.log("gotit");
});



app.get("/api/users",function(req,res) 
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

app.get("/api/notify", function (req,res){
	// tell front end	
});
// all variables in URL are ObjectIds. 
app.get("/api/friends/:user", function (req, res)
{
/* 
remnants from merge attempt, don't know which one will work better..	
	users.find(function(err, cursor)
	{ 
		var query = {"_id": new ObjectID(req.params.user)};
		var projection = {"_id": false, "friends": true};

		users.find(query, projection).toArray(function(err, found)
		{
			if (err) throw err;
			console.log(req.params.user);
			console.log("found");
			console.log(found);
			res.send(found);
			return found;
		});
	});
*/
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
	var query = {"_id": req.params.user};
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

