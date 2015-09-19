var express = require ("express"),
	app = express(),
	MongoClient = require("mongodb"),
	http = require("http");

var users;

MongoClient.connect("mongodb://colab-sbx-280.oit.duke.edu:27017", function(err, db)
{
	if (err) throw err;
	
	users = db.collection("users");
});
	var bodyParser = require("body-parser");
	app.use(bodyParser.json());
	


http.createServer(app).listen(app.get("port"), function()
{
	console.log("Listening on port " + app.get("port"));
});
