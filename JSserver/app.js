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
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.set("port", process.env.PORT || 8000);	


app.get("/friends/:user", function (req, res)
{
	var query = {"ObjectId": user["ObjectId"]};

	users.find(query).toArray(function(err, found)
	{
		if (err) throw err;

		return found;
	});
});




http.createServer(app).listen(app.get("port"), function()
{
	console.log("Listening on port " + app.get("port"));
});
