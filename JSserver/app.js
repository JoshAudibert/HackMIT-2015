var express = require ("express"),
	app = express(),
	MongoClient = require("mongodb"),
	http = require("http");

var users;

MongoClient.connect("mongodb://colab-sbx-280.oit.duke.edu:27017/hackmit?connectTimeoutMS=300000", function(err, db)
{
	if (err) throw err;
	users = db.collection("users");
});
app.set("port", process.env.PORT || 8000);


app.get("/friends/:user", function (req, res)
{
	var query = {"_id": req.params.user};
	res.send(users.find(query).toArray(function(err, found)
	{
		if (err) throw err;

		return found;
	}));
});


app.get("/", function (req, res)
{
	
		console.log("hi");
		res.send("hello");

});





http.createServer(app).listen(app.get("port"), function()
{
	console.log("Listening on port " + app.get("port"));
});
