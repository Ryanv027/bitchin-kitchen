
var express = require("express");
var bodyParser = require("body-parser");

require('dotenv').config();
const cmd = require('node-cmd');

var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes go Here
// require("./routes/sample.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  cmd.run(`psql -U ${process.env.DB_USER} bkitchen < db/seeds.sql`)
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
