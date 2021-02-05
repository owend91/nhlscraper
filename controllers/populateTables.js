const scrape = require('./NhlScraper.js')
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nhlDB", {
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
  team: String,
  years: [String]
});

const Player = new mongoose.model("Player", playerSchema);

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
        const playerDoc = new Player(player);
        playerDoc.save(function(err) {
          if (err) {
            console.log(err);
          }
        });
        currTeamObj.players.push(playerDoc);
      }
      currTeamObj.save(function(err){
        if(err){
          console.log(err);
        }
      });
    });
  }
}

// const teams = ['bruins','capitals', 'sabres'
// ]

const teams = ['bruins', 'sabres', 'devils', 'islanders', 'rangers',
  'flyers', 'penguins', 'capitals', 'hurricanes', 'blackhawks',
  'bluejackets', 'stars', 'redwings', 'panthers', 'predators',
  'lightning', 'ducks', 'coyotes', 'avalanche', 'kings',
  'wild', 'sharks', 'blues', 'goldenknights', 'flames', 'oilers',
  'canadiens', 'senators', 'mapleleafs', 'canucks', 'jets',
]

// useful queries
// FInd who was with a team for the most seasons
//in shell: db.players.aggregate( {$match:{'team':'capitals'}}, {$unwind:"$years"}, {"$group" : {_id:"$name", count:{$sum:1}}}, { $sort : { "count" : -1 }})

//in shell: db.players.aggregate( {$unwind:"$years"}, {"$group" : {_id:"$name", count:{$sum:1}}}, { $sort : { "count" : -1 }})
//in Robo 3T:db.getCollection('players').aggregate( {$unwind:"$years"}, {$sortByCount:"$name"})


//Teams with most players
//Robo 3T: db.getCollection('teams').aggregate({$unwind:"$players"}, {$sortByCount:"$name"})
