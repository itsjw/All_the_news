var express = require('express');
var mongojs = require("mongojs");
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var path = require('path');

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapeData"];
var db = process.env.MONGODB_URI || 'mongodb://root:root@ds259855.mlab.com:59855/oddnews'

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


app.use(express.static("./public"));

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "./public/index.html"));
  
});

// Retrieve data from the db
app.get("/all", function(req, res) {

  // Find all results from the scrapedData collection in the db
  db.scrapeData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);

    }
  });
});

app.get("/name", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
  db.scrapeData.find().sort({ name: 1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {

  // Make a request for the news section of ycombinator
  request("http://www.thesmokinggun.com//", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".field-content").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");
      var image = $(element).children("a").children("img").attr("src");
console.log(image);
// console.log(title);
      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.scrapeData.insert({
          title: title,
          link: link,
          image: image
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});
var PORT = process.env.PORT || 3000;
// var db = process.env.MONGODB_URI || 'mongodb://<root>:<root>@ds259855.mlab.com:59855/oddnews'

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port !");
});
