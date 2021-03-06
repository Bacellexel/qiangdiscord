const express = require('express');
const bodyParser = require("body-parser");
const cmdList = require("../data/websitedata.json");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public/"));

app.get("/", function(req, res) {
  res.render("index", {
    commandsList: cmdList
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
