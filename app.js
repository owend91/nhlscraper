const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const axios = require('axios');
const cheerio = require('cheerio');
const scrape = require('./controllers/NhlScraper.js')
const db = require('./populateTables.js')
const _ = require('lodash');
mongoose.connect("mongodb://localhost:27017/capsDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const url = "https://www.nhl.com/capitals/roster/";
const years = []


const app = express();

// const playerSchema = new mongoose.Schema({
//   name: String,
//   number: String,
//   position: String,
//   shoots: String,
//   height: String,
//   weight: String,
//   birthdate: String,
//   hometown: String
// });
// const Player = new mongoose.model("Player", playerSchema);

app.get("/", function(req, res) {
  // Player.deleteMany({}, function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  db.populateDocuments();
  // const urls = [];
  // populateYears();
  // for (year of years) {
  //   urls.push(url + year);
  // }
  //
  // let promiseArray = urls.map(url => (axios.get(url).catch(error => console.log('Invalid year'))));
  // Promise.all(promiseArray)
  //   .then(
  //     results => {
  //       let totalNames = [];
  //       let thisYearNames = [];
  //       let namesToInsert = [];
  //       for (result of results) {
  //         if (result) {
  //           const currYear = result.config.url.slice(result.config.url.length -4);
  //           console.log("Current Year: " + currYear);
  //           namesToInsert = [];
  //           thisYearNames = scrape.getNames(result.data);
  //           for (thisYearName of thisYearNames) {
  //             if (_.findIndex(totalNames, function(o) {
  //                 return o == thisYearName;
  //               }) == -1) {
  //               totalNames.push(thisYearName);
  //               namesToInsert.push(thisYearName);
  //             }
  //           }
  //           const stats = scrape.getStats(result.data);
  //
  //           for ([i, name] of namesToInsert.entries()) {
  //             const player = new Player({
  //               name: name,
  //               number: stats[i].number,
  //               position: stats[i].position,
  //               shoots: stats[i].shoots,
  //               height: stats[i].height,
  //               weight: stats[i].weight,
  //               birthdate: stats[i].birthdate,
  //               hometown: stats[i].hometown
  //             });
  //             player.save(function(err) {
  //               if (err) {
  //                 console.log(err);
  //               }
  //             });
  //           }
  //         }
  //       }
  //     });
});



app.listen(process.env.PORT || 3001, function() {
  console.log("Server started on port 3001");
});

function populateYears() {
  let currYear = new Date().getFullYear();
  while (currYear > 1916) {
    currYear--;
    years.push('' + currYear);
  }
  // console.log(years);
}
