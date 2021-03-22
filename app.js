const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require('cheerio');
const db = require('./controllers/populateTables.js')
const mongoose = require("mongoose");
const Player = require('./models/playerModel.js')
mongoose.connect("mongodb://localhost:27017/nhlDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();

app.route("/players/:team/:year")
.get(function(req, res) {
  const query = {};
  const team = req.params.team;
  const year = req.params.year;
  query[`teams.${team}`] = {$all: [year]};
  Player.find(query, function(err, foundPlayers) {

    if (err) {
      res.send(err);
    } else {
      console.log('foundPlayers: ' +foundPlayers);
      res.send(foundPlayers);
    }
  });
})

// app.get("/", function(req, res) {
//   db.populateDocuments(true);
// });



app.listen(process.env.PORT || 3001, function() {
  console.log("Server started on port 3001");
});
