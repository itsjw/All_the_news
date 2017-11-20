var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");



var port = process.env.3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/allergy_controller.js");

app.use("/", routes);

app.listen(port);


var db = process.env.MONGODB_URI || "mongodb://<root>:<root>@ds259855.mlab.com:59855/oddnews"

mongoose.connect(db, function(error){
	if 
})