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

app.route("/playersByTeam/:team/:year?")
.get(function(req, res) {
  const query = {};
  const team = req.params.team;
  const year = req.params.year;
  if(year){
    query[`teams.${team}`] = {$all: [year]};
  } else {
    query[`teams.${team}`] = {$exists:true};
  }
  Player.find(query, function(err, foundPlayers) {

    if (err) {
      res.send(err);
    } else {
      console.log('foundPlayers: ' +foundPlayers);
      res.send(foundPlayers);
    }
  });
});

app.route("/playersOnTeams?*")
.get(function(req, res) {
  const query = {};
  console.log(req.query);
  for(const team in req.query){
    if(team.startsWith('team')){
      query[`teams.${req.query[team]}`] = {$exists:true};
    }
  }
  console.log(query);
  Player.find(query, function(err, foundPlayers) {

    if (err) {
      res.send(err);
    } else {
      console.log('foundPlayers: ' +foundPlayers);
      res.send(foundPlayers);
    }
  });
});
app.route("/players?*")
.get(function(req, res) {
  const query = {};
  // console.log(req.query);
  for(const param in req.query){
    if(param.startsWith('team')){
      query[`teams.${req.query[param]}`] = {$exists:true};
    } else if(param.toLowerCase() === 'position'){
      query[param.toLowerCase()] = req.query[param].toUpperCase();
    } else if(param.toLowerCase() === 'shoots'){
      query[param.toLowerCase()] = req.query[param].toUpperCase();
    } else if(param.toLowerCase() === 'number'){
      query[param.toLowerCase()] = req.query[param];
    } else if(param.toLowerCase() === 'name'){
      const splitName = req.query[param].split(' ');
      // let regEx;
      // for(const name in splitName){
      //
      // }
      console.log(req.query[param].split(' '));
      query[param.toLowerCase()] = {$regex: '^' + splitName[0] + '.*\s?' + splitName[1] + '.*'};

    }
  }
  // console.log(query);
  Player.find(query, function(err, foundPlayers) {

    if (err) {
      res.send(err);
    } else {
      // console.log('foundPlayers: ' +foundPlayers);
      res.send(foundPlayers);
    }
  });
});

// app.get("/", function(req, res) {
//   db.populateDocuments(true);
// });



app.listen(process.env.PORT || 3001, function() {
  console.log("Server started on port 3001");
});
