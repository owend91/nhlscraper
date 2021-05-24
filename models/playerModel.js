const mongoose = require("mongoose");

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
  stats: {type: Map},
  teams: {type: Map, of:[String]}
});
const Player = new mongoose.model("Player", playerSchema);

module.exports = Player;
