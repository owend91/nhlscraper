const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');
mongoose.connect("mongodb://localhost:27017/capsDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const url = "https://www.nhl.com/capitals/roster/";
const years = []


const app = express();

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

app.get("/", function(req, res) {
  Player.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
  });
  const urls = [];
  populateYears();
  for (year of years) {
    urls.push(url + year);
  }

  let promiseArray = urls.map(url => (axios.get(url).catch(error => console.log('Invalid year'))));
  Promise.all(promiseArray)
    .then(
      results => {
        let totalNames = [];
        let thisYearNames = [];
        let namesToInsert = [];
        for (result of results) {
          if (result) {
            const currYear = result.config.url.slice(result.config.url.length -4);
            console.log("Current Year: " + currYear);
            namesToInsert = [];
            thisYearNames = getNames(result.data);
            for (thisYearName of thisYearNames) {
              if (_.findIndex(totalNames, function(o) {
                  return o == thisYearName;
                }) == -1) {
                totalNames.push(thisYearName);
                namesToInsert.push(thisYearName);
              }
            }
            const stats = getStats(result.data);

            for ([i, name] of namesToInsert.entries()) {
              const player = new Player({
                name: name,
                number: stats[i].number,
                position: stats[i].position,
                shoots: stats[i].shoots,
                height: stats[i].height,
                weight: stats[i].weight,
                birthdate: stats[i].birthdate,
                hometown: stats[i].hometown
              });
              player.save(function(err) {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        }
      });
});



app.listen(process.env.PORT || 3001, function() {
  console.log("Server started on port 3001");
});

function getNames(html) {
  const data = [];
  const fnames = [];
  const lnames = [];
  const $ = cheerio.load(html);
  let fname = "";
  let lname = "";
  $('.name-col__list').each((i, elem) => {
    $(elem.children).each((i, child) => {
      fname = "";
      lname = "";
      if ($(child).attr('class')) {
        const classes = _.split($(child).attr('class'), ' ');
        // console.log('classes: ' + classes + ' : ' + $(child).attr('class'));
        if (_.findIndex(classes, function(o) {
            return o == 'name-col__firstName';
          }) != -1) {
          // console.log('fname: ' + $(child).text());
          fnames.push($(child).text());
        } else if (_.findIndex(classes, function(o) {
            return o == 'name-col__lastName';
          }) != -1) {
          // console.log('lname: ' + $(child).text());
          lnames.push($(child).text());
        }
      }

    });

    // data.push($(elem.childNodes[1]).attr('class'));
  });
  if (fnames.length === lnames.length) {
    for (var i = 0; i < fnames.length; i++) {
      data.push(fnames[i] + ' ' + lnames[i]);
    }
  }
  // console.log(data);
  return data;
}


function getStats(html) {
  const data = [];
  const numbers = [];
  const positions = [];
  const shoots = [];
  const heights = [];
  const weights = [];
  const birthdates = [];
  const hometowns = [];

  const $ = cheerio.load(html);
  $('.data-table__scrollable tbody tr').each((i, elem) => {
    $(elem.children).each((i, child) => {
      // console.log(child);
      if ($(child).attr('class')) {
        const classes = _.split($(child).attr('class'), ' ');
        // console.log('classes: ' + classes + ' : ' + $(child).attr('class'));
        if (_.findIndex(classes, function(o) {
            return o == 'number-col';
          }) != -1) {
          numbers.push($(child).text());

        } else if (_.findIndex(classes, function(o) {
            return o == 'position-col';
          }) != -1) {
          positions.push($(child).text());

        } else if (_.findIndex(classes, function(o) {
            return o == 'shoots-col';
          }) != -1) {
          shoots.push($(child).text());

        } else if (_.findIndex(classes, function(o) {
            return o == 'height-col';
          }) != -1) {
          heights.push($(child).text());

        } else if (_.findIndex(classes, function(o) {
            return o == 'weight-col';
          }) != -1) {
          weights.push($(child).text());

        } else if (_.findIndex(classes, function(o) {
            return o == 'birthdate-col';
          }) != -1) {
          birthdates.push($(child).text());

        } else if (_.findIndex(classes, function(o) {
            return o == 'hometown-col';
          }) != -1) {
          hometowns.push($(child).text());

        }
      }
    });
  });
  for (var i = 0; i < numbers.length; i++) {
    data.push({
      number: numbers[i],
      position: positions[i],
      shoots: shoots[i],
      height: heights[i],
      weight: weights[i],
      birthdate: birthdates[i],
      hometown: hometowns[i]
    });
  }
  // console.log(data);
  return data;
}

function populateYears() {
  let currYear = new Date().getFullYear();
  while (currYear > 1916) {
    currYear--;
    years.push('' + currYear);
  }
  // console.log(years);
}
