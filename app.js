require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require('cheerio');
const db = require('./controllers/populateTables.js')
const mongoose = require("mongoose");
const Player = require('./models/playerModel.js')
const apiHelper = require('./controllers/ApiHelper.js');
const cors = require('cors')

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();
app.use(cors())

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
// app.route("/distinctCountry")
// .get(function(req, res) { 
//   Player.find().distinct('hometown', function(err, hometowns){
//     const countries = [];
//     for(town of hometowns){
//       let country = town.substring(town.length-3);
//       if(!countries.includes(country)){
//         countries.push(country);
//       }
//     }
//     res.send(countries);
//   })
// });

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
  const otherParams = []
  console.log(req.query);
  let sameSeason = false;
  for(const param in req.query){
    if(param.startsWith('team')){
      if(req.query[param].endsWith('ALL')){
        // const team = req.query[param].slice(req.query[param] - 3)
        query[`teams.${req.query[param].slice(0,req.query[param].length-3)}`] = {$exists:true};
      } else {
        const team = req.query[param].slice(0,req.query[param].length-4);
        const year = req.query[param].slice(req.query[param].length-4);
        query[`teams.${team}`] = {$all: [year]};
      }
      
    } else if(param.toLowerCase() === 'position'){
      query[param.toLowerCase()] = req.query[param].toUpperCase();
    } else if(param.toLowerCase() === 'shoots'){
      query[param.toLowerCase()] = req.query[param].toUpperCase();
    } else if(param.toLowerCase() === 'number'){
      query[param.toLowerCase()] = req.query[param];
    } else if(param.toLowerCase() === 'name'){
      const splitName = req.query[param].split(' ');
      let regEx = '';
      for(const ind in splitName){
        regEx += splitName[ind] + '.*\s?';
      }
      query[param.toLowerCase()] = {$regex: regEx, $options:'i'};
    } else if(param.toLowerCase() === 'birthmonth'){
      let regEx = req.query[param].slice(0,3) + '.*';
      query['birthdate'] = {$regex: regEx, $options:'i'};
    } else if(param.toLowerCase() === 'weight'){
      query[param.toLowerCase()] = req.query[param];
    } else if(param.toLowerCase() === 'homecountry'){
      let regEx =  '.*' + req.query[param] + '$';
      query['hometown'] = {$regex: regEx, $options:'i'};
    } else {
      if(param === 'sameseason'){
        sameSeason = req.query[param] === 'y'? true : false;
      } else {
        otherParams.push(param);
      }
    }
  }
  console.log(otherParams);
  const foundPlayers = Player.find(query, function(err, foundPlayers) {

    if (err) {
      res.send(err);
    } else {
      // console.log('foundPlayers: ' +foundPlayers);
        if(otherParams.length === 0){
          res.send(foundPlayers);
        } else {
          const playerMap = {};
          for(player of foundPlayers){
            playerMap[player.nhlId] = player;
          }  

          const returnMap = {};
          if(sameSeason){
            for(player of foundPlayers){
              if(apiHelper.statComparatorSameSeason(player, otherParams, req)){
                returnMap[player.nhlId] = true;
              }
            }
          } else {
            let firstLoop = true;
            for(const param of otherParams){
              if(param.startsWith("season")){
                const goalValue = parseInt(req.query[param].slice(2));
                const comparator = req.query[param].slice(0,2);
                for(player of foundPlayers){
                  //loop through seasons
                  let added = false;
                  if(apiHelper.statComparator(player, param.slice(6), comparator, goalValue)){
                    if(firstLoop){
                      returnMap[player.nhlId] = true;
                    }   
                  } else {
                    returnMap[player.nhlId] = false;
                  }
                }
              }
              firstLoop = false;
            }
          }
          const returnArray = [];
          for(const [key, val] of Object.entries(returnMap)){
            if(val){
              returnArray.push(playerMap[key]);
            }
          }
          // console.log(returnArray);
          res.send(Object.values(returnArray));
        }
    }
  });
});

// app.get("/", function(req, res) {
//   db.populateDocuments(true);
// });


app.listen(process.env.PORT || 3001, function() {
  console.log("Server started on port 3001");
});
