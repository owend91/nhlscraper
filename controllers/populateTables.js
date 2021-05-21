require('dotenv').config();
const scrape = require('./NhlScraper.js')
const mongoose = require("mongoose");
const Player = require('../models/playerModel.js')
const constants = require('../constants/constants.js')
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const playerSchema = new mongoose.Schema({
  name: String,
  number: String,
  position: String,
  shoots: String,
  height: String,
  weight: String,
  birthdate: String,
  hometown: String,
  nhlId: String,
  teams: {type: Map, of:[String]}
});

const allPlayers = [];

const teamSchema = new mongoose.Schema({
  name: String,
  players: [playerSchema]
});

const Team = new mongoose.model("Team", teamSchema);

module.exports.populateDocuments = populateDocuments;

async function deleteAllDocuments() {
  Player.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
  });

  Team.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

async function populateDocuments(deleteDocuments) {
  if (deleteDocuments) {
    deleteAllDocuments();
  }
  console.log("starting populate");
  for (team of teams) {
    console.log('Working on ' + team);
    const currTeamObj= new Team({
      name : team,
      players : []
    });
    await scrape.createPlayerObjects(team).then(players => {
      for (player of players) {
        const foundPlayers = allPlayers.filter(p => {return p.nhlId === player.nhlId})
        if(foundPlayers.length == 0){
          const playerDoc = new Player(player);
          // console.log(playerDoc);
          // playerDoc.save(function(err) {
          //   if (err) {
          //     console.log(err);
          //   }
          // });
          currTeamObj.players.push(playerDoc);
          allPlayers.push(playerDoc);
        } else {
          const foundPlayer = foundPlayers[0];
          foundPlayer.teams.set(team, player.teams[team]);

          // foundPlayer.save(function(err) {
          //   if (err) {
          //     console.log(err);
          //   }
          // });
          currTeamObj.players.push(foundPlayer);
        }
      }
      currTeamObj.save(function(err){
        if(err){
          console.log(err);
        }
      });
    });
  }
  for(player of allPlayers){
    player.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

const teams = constants.teams

// useful queries
// FInd who was with a team for the most seasons
//in shell: db.players.aggregate( {$match:{'team':'capitals'}}, {$unwind:"$years"}, {"$group" : {_id:"$name", count:{$sum:1}}}, { $sort : { "count" : -1 }})

//in shell: db.players.aggregate( {$unwind:"$years"}, {"$group" : {_id:"$name", count:{$sum:1}}}, { $sort : { "count" : -1 }})
//in Robo 3T:db.getCollection('players').aggregate( {$unwind:"$years"}, {$sortByCount:"$name"})


//Teams with most players
//Robo 3T: db.getCollection('teams').aggregate({$unwind:"$players"}, {$sortByCount:"$name"})

//Find all the players on a team
// db.getCollection('players').find({'teams.capitals':{$exists:true}})

//Find all players that have been on two teams:
// db.getCollection('players').find({'teams.capitals':{$exists:true},'teams.bruins':{$exists:true}})
