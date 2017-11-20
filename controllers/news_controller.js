var express = require("express");

var router = express.Router();

// Import the model (allergy.js) to use its database functions.
var ingredient = require("../models/news.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  ingredient.all(function(data) {
    var hbsObject = {
      //Add db output???
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
 // <-----------------TODO--------->
 // <------add the rest of the coloum names------------->
router.post("/api/foods", function(req, res) {
  console.log("Get", req.body.ingredient);
  ingredient.ingredientsQuery(req.body.ingredient, function(result) {
     var hbsObject = {
      ?db data?: result
    };
   // console.log(hbsObject);
    res.render("index", hbsObject);
    console.log(result);
    // res.send(result);
    // Send back the ID of the new quote     res.json({ id: result.insertId });
  });
});

router.get("/api/foods", function(req, res) {
  ingredient.ingredientsQuery(req.body.ingredient, function(result) {
    var hbsObject = {
      ingredient: result
    };
   console.log(hbsObject);
    res.render("index", hbsObject);
    console.log(result);
    // Send back the ID of the new quote     res.json({ id: result.insertId });
  });
});
// // change route path for this project---->
 router.put("/api/foods/:id", function(req, res) {
  var condition = "id = " + req.params.id;

//   console.log("condition", condition);

  ingredient.update({
     // set field names from current database---->
    devoured: req.body.devoured
   }, condition, function(result) {
//     console.log(result);
     if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
       return res.status(404).end();
     } else {
       res.status(200).end();
     }
  });
 });

// Export routes for server.js to use.
module.exports = router;