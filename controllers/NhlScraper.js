const cheerio = require('cheerio');
const _ = require('lodash');
const axios = require('axios');
const puppeteer = require('puppeteer');
const nhlApi = require('./NhlApiCalls');
const constants = require('../constants/constants');
const e = require('express');

const nhlUrl = "https://www.nhl.com/";
const years = []
const playerUrl = "https://www.nhl.com/player/"

const firstYearMap = constants.firstYearMap;
const teamShorthandMap = constants.teamShorthandMap;

populateYears();
module.exports.getNames = getNames;
module.exports.getStats = getStats;
module.exports.getPlayerStats = async function getPlayerStats(players){
  const urls = [];
  let returnPlayers = []
  let stats = {}
  let allCareerStats = {}
  let playerPositions = {}


  for (player of players) {
    urls.push(playerUrl + player.nhlId);
    playerPositions[player.nhlId] = player.position
    // console.log(playerUrl + player.nhlId)
  }
  const browser = await puppeteer.launch({dumpio: false});
  const [page] = await browser.pages();
  let count = 0;
  for (url of urls){
    let playerStats = {}
    let id = url.slice(playerUrl.length);
    console.log(`${count}: ${id}`)
    await page.setDefaultNavigationTimeout(0);
    page.goto(url) 
    let pageExists = true;
    try {
      await page.waitForSelector('#careerTable .responsive-datatable__pinned', {timeout: 30000});
    } catch (e) {
      pageExists = false;
    }
    
    // await page.waitForSelector('#careerTable .responsive-datatable__pinned')
    console.log(`pageExists: ${pageExists} for ${id}`)
    let data = null;
    if(pageExists){
        data = await page.evaluate(() => {
        if(document.querySelector('#careerTable .responsive-datatable__pinned')){
          return document.querySelector('#careerTable .responsive-datatable__pinned').outerHTML
        } else {
          return null;
        }
      });
    } 

    if(data){
      const $ = cheerio.load(data);
      $('tbody tr').each((i, row) => {
        let season = '';
        let team = '';
        let seasonStat = {}
        let stat = {}
        const arr = $('td span', row).slice(0);
        season = $(arr[0]).text().replace('-','')
        console.log(`Working on season ${season} for ${id}`)
        if(!playerStats[season]){
          playerStats[season] = {}
        }
        team = $(arr[1]).text();
        if(teamShorthandMap[team]){
          team = teamShorthandMap[team];
          console.log(`Working on team ${team} for ${id}`)
          if(playerPositions[id] === 'G'){
            stat['games'] = $(arr[2]).text()
            stat['gamesStarted'] = $(arr[3]).text()
            stat['wins'] = $(arr[4]).text() 
            stat['losses'] = $(arr[5]).text()
            stat['ties'] = $(arr[6]).text()
            stat['overtimeLosses'] = $(arr[7]).text()
            stat['shotsAgainst'] = $(arr[8]).text()
            stat['goalsAgainst'] = $(arr[9]).text()
            stat['goalsAgainstAverage'] = $(arr[10]).text()
            stat['saves']= $(arr[11]).text()
            stat['savePercentage'] = $(arr[12]).text()
            stat['shutouts'] = $(arr[13]).text()
            stat['minutes'] = $(arr[14]).text()
          } else {
            stat['games'] = $(arr[2]).text()
            stat['goals'] = $(arr[3]).text()
            stat['assists'] = $(arr[4]).text() 
            stat['points'] = $(arr[5]).text()
            stat['plusMinus'] = $(arr[6]).text()
            stat['pim'] = $(arr[7]).text()
            stat['powerPlayGoals'] = $(arr[8]).text()
            stat['powerPlayPoints'] = $(arr[9]).text()
            stat['shortHandedGoals'] = $(arr[10]).text()
            stat['shorthandedPoints'] = $(arr[11]).text()
            stat['gameWinningGoals'] = $(arr[12]).text()
            stat['overTimeGoals'] = $(arr[13]).text()
            stat['shots'] = $(arr[14]).text()
            stat['shotPct'] = $(arr[15]).text()
            stat['faceOffPct'] = $(arr[16]).text()
          }


          playerStats[season][team] = stat;
        }
       
      });

      let careerStats = {};
      $('tfoot tr').each((i, row) => {
        console.log(`Working on career stats for ${id}`)
        const arr = $('td span', row).slice(0);
        if(playerPositions[id] === 'G'){
          careerStats['games'] = $(arr[2]).text().replace(",","")
          careerStats['gamesStarted'] = $(arr[3]).text().replace(",","")
          careerStats['wins'] = $(arr[4]).text().replace(",","")
          careerStats['losses'] = $(arr[5]).text().replace(",","")
          careerStats['ties'] = $(arr[6]).text().replace(",","")
          careerStats['overtimeLosses'] = $(arr[7]).text().replace(",","")
          careerStats['shotsAgainst'] = $(arr[8]).text().replace(",","")
          careerStats['goalsAgainst'] = $(arr[9]).text().replace(",","")
          careerStats['goalsAgainstAverage'] = $(arr[10]).text().replace(",","")
          careerStats['saves']= $(arr[11]).text().replace(",","")
          careerStats['savePercentage'] = $(arr[12]).text().replace(",","")
          careerStats['shutouts'] = $(arr[13]).text().replace(",","")
          careerStats['minutes'] = $(arr[14]).text().replace(",","")
        } else {
          careerStats['games'] = $(arr[2]).text().replace(",","")
          careerStats['goals'] = $(arr[3]).text().replace(",","")
          careerStats['assists'] = $(arr[4]).text().replace(",","")
          careerStats['points'] = $(arr[5]).text().replace(",","")
          careerStats['plusMinus'] = $(arr[6]).text().replace(",","")
          careerStats['pim'] = $(arr[7]).text().replace(",","")
          careerStats['powerPlayGoals'] = $(arr[8]).text().replace(",","")
          careerStats['powerPlayPoints'] = $(arr[9]).text().replace(",","")
          careerStats['shortHandedGoals'] = $(arr[10]).text().replace(",","")
          careerStats['shorthandedPoints'] = $(arr[11]).text().replace(",","")
          careerStats['gameWinningGoals'] = $(arr[12]).text().replace(",","")
          careerStats['overTimeGoals'] = $(arr[13]).text().replace(",","")
          careerStats['shots'] = $(arr[14]).text().replace(",","")
          careerStats['shotPct'] = $(arr[15]).text().replace(",","")
          careerStats['faceOffPct'] = $(arr[16]).text().replace(",","")
        }
      });
      stats[id] = playerStats;
      allCareerStats[id] = careerStats;
      count++;
  } else {
    stats[id] = {};
    allCareerStats[id] = {};
    count++;
  } 
  }
  for(player of players){
    player.stats = stats[player.nhlId]
    player.careerStats = allCareerStats[player.nhlId]
    returnPlayers.push(player)
  }
  return returnPlayers;
}

module.exports.createPlayerObjects = function createPlayerObjects(team){
  const teamUrl = nhlUrl + team + '/roster/';
  const urls = [];
  let returnPlayers = []

  for (year of years) {
    if(year < firstYearMap[team]){
      break;
    }
    urls.push(teamUrl + year);
  }

  let promiseArray = urls.map(url => (axios.get(url).catch(error => console.log('Invalid year: ' + url.slice(url.length-4)))));
  return Promise.all(promiseArray)
    .then(
       results => {
        let thisYearNames = [];
        let thisYearNhlIds = [];
        for (result of results) {
          
          if (result) {
            let currYear = result.config.url.slice(result.config.url.length -4);
            console.log("Current Year: " + currYear);
            let stats = getStats(result.data);
            thisYearNames = getNames(result.data);
            thisYearNhlIds = getNhlIds(result.data);
            // console.log(thisYearNames);
            for ([i,thisYearName] of thisYearNames.entries()) {
              let index = _.findIndex(returnPlayers, function(o) {
                  return o.name == thisYearName;
                });
              if (index == -1) {
                const player = {
                  name: thisYearName,
                  number: stats[i].number,
                  position: stats[i].position,
                  shoots: stats[i].shoots,
                  height: stats[i].height.slice(0,stats[i].height.indexOf('"')+1),
                  weight: stats[i].weight,
                  birthdate: stats[i].birthdate.slice(8),
                  hometown: stats[i].hometown,
                  nhlId: thisYearNhlIds[i],
                  teams:{}
                };
                player.teams[team] = [currYear];
                console.log(player);
                returnPlayers.push(player);
              } else {
                returnPlayers[index].teams[team].push(currYear);
              }
            }
          }
        }
        return returnPlayers;
      });

}

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

function getNhlIds(html) {
  const data = [];
  const $ = cheerio.load(html);
  $('.player-photo').each((i, elem) => {
    // data.push(elem.attr("src"));
    data.push(elem.parent.attribs.href.slice(elem.parent.attribs.href.lastIndexOf("-")+1));

    });
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
  while (currYear > 1917) {
    currYear--;
    years.push('' + currYear);
  }



  // console.log(years);
}
