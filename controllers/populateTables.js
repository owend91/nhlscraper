const scrape = require('./NhlScraper.js')
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/capsDB", {
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
  hometown: String
});

const Player = new mongoose.model("Player", playerSchema);

module.exports.populateDocuments = populateDocuments;

async function deleteAllDocuments() {
  Player.deleteMany({}, function(err) {
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

  scrape.createPlayerObjects().then(players => {
    for (player of players) {
      const playerDoc = new Player(player);
      playerDoc.save(function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}
