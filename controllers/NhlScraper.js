const cheerio = require('cheerio');
const _ = require('lodash');
const axios = require('axios');
const puppeteer = require('puppeteer');
const nhlApi = require('./NhlApiCalls');

const nhlUrl = "https://www.nhl.com/";
const years = []
const playerUrl = "https://www.nhl.com/player/"

populateYears();
module.exports.getNames = getNames;
module.exports.getStats = getStats;
module.exports.getPlayerStats = async function getPlayerStats(players){
  const urls = [];
  let returnPlayers = []
  let playerMap = {}
  let stats = {}
  let allCareerStats = {}


  for (player of players) {
    urls.push(playerUrl + player.nhlId);
    // console.log(playerUrl + player.nhlId)
    playerMap[player.nhlId] = player;
  }
  const browser = await puppeteer.launch({dumpio: false});
  const [page] = await browser.pages();
  for (url of urls){
    let playerStats = {}
    let id = url.slice(playerUrl.length);
    console.log(id)
    await page.goto(url);
    // const data = await page.evaluate(() => document.querySelector('#careerTable .responsive-datatable__pinned tbody').outerHTML);
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    // console.log(data);
    const $ = cheerio.load(data);
    $('#careerTable .responsive-datatable__pinned tbody').each((i, elem) => {
      $(elem.children).each((i, child) => {
        if(child.name && child.name === 'tr'){
          let season = '';
          let team = '';
          let seasonStat = {}
          let stat = {}
          let x = 0;
          $(child.children).each((i, grandchild) => {
            
            if(grandchild.name && grandchild.name === 'td'){
              
              $(grandchild.children).each((i, greatgrandchild) => {
                if(greatgrandchild.name && greatgrandchild.name === 'span'){
                    // console.log($(greatgrandchild).text());
                    switch(x) {
                      case 0:
                        season = $(greatgrandchild).text().replace('-','')
                        if(!playerStats[season]){
                          playerStats[season] = {}
                        }
                        break;
                      case 1:
                        team = $(greatgrandchild).text();
                        break;
                      case 2:
                        stat['games'] = $(greatgrandchild).text()
                        break;
                      case 3:
                        stat['goals'] = $(greatgrandchild).text()
                        break;       
                      case 4:
                        stat['assists'] = $(greatgrandchild).text()        
                        break;
                      case 5:
                        stat['points'] = $(greatgrandchild).text()
                        break;
                      case 6:
                        stat['plusMinus'] = $(greatgrandchild).text()
                        break;
                      case 7:
                        stat['pim'] = $(greatgrandchild).text()
                        break;
                      case 8:
                        stat['powerPlayGoals'] = $(greatgrandchild).text()
                        break;
                      case 9:
                        stat['powerPlayPoints'] = $(greatgrandchild).text()
                        break;
                      case 10:
                        stat['shortHandedGoals'] = $(greatgrandchild).text()
                        break;
                      case 11:
                        stat['shorthandedPoints'] = $(greatgrandchild).text()
                        break;
                      case 12:
                        stat['gameWinningGoals'] = $(greatgrandchild).text()
                        break;
                      case 13:
                        stat['overTimeGoals'] = $(greatgrandchild).text()
                        break;
                      case 14:
                        stat['shots'] = $(greatgrandchild).text()
                        break;
                      case 15:
                        stat['shotPct'] = $(greatgrandchild).text()
                        break;
                      case 16:
                        stat['faceOffPct'] = $(greatgrandchild).text()
                        playerStats[season][team] = stat;
                        break;
                    }
                    x++;
                }
              });
            }
          });
        }
      });
    });

    let careerStats = {};
    $('#careerTable .responsive-datatable__pinned tfoot').each((i, elem) => {
      $(elem.children).each((i, child) => {
        let x = 0;
        if(child.name && child.name === 'tr'){
          $(child.children).each((i, grandchild) => {
            
            if(grandchild.name && grandchild.name === 'td'){
              
              $(grandchild.children).each((i, greatgrandchild) => {
                if(greatgrandchild.name && greatgrandchild.name === 'span'){
                  switch(x) {
                    case 0:
                      break;
                    case 1:
                      break;
                    case 2:
                      careerStats['games'] = $(greatgrandchild).text().replace(",","");
                      break;
                    case 3:
                      careerStats['goals'] = $(greatgrandchild).text().replace(",","")
                      break;       
                    case 4:
                      careerStats['assists'] = $(greatgrandchild).text().replace(",","")     
                      break;
                    case 5:
                      careerStats['points'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 6:
                      careerStats['plusMinus'] = $(greatgrandchild).text()
                      break;
                    case 7:
                      careerStats['pim'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 8:
                      careerStats['powerPlayGoals'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 9:
                      careerStats['powerPlayPoints'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 10:
                      careerStats['shortHandedGoals'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 11:
                      careerStats['shorthandedPoints'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 12:
                      careerStats['gameWinningGoals'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 13:
                      careerStats['overTimeGoals'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 14:
                      careerStats['shots'] = $(greatgrandchild).text().replace(",","")
                      break;
                    case 15:
                      careerStats['shotPct'] = $(greatgrandchild).text()
                      break;
                    case 16:
                      careerStats['faceOffPct'] = $(greatgrandchild).text()
                      break;
                  }
                  x++;
                }
              });
            }
          });
        }
      });
    });
     stats[id] = playerStats;
     allCareerStats[id] = careerStats;
    
  }
  console.log(stats);
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
