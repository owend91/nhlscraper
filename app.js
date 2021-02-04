const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cheerio = require('cheerio');
const db = require('./controllers/populateTables.js')

const url = "https://www.nhl.com/capitals/roster/";
const years = []


const app = express();

app.get("/", function(req, res) {
  db.populateDocuments(true);
});



app.listen(process.env.PORT || 3001, function() {
  console.log("Server started on port 3001");
});
