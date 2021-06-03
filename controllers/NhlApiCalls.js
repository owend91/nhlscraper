const cheerio = require('cheerio');
const _ = require('lodash');
const axios = require('axios');

const urlPrefix = "http://statsapi.web.nhl.com/api/v1/people/"
const urlSeasonEnd = "/stats?stats=yearByYear";
const urlCareerEnd = "/stats?stats=careerRegularSeason";


module.exports.getSeasonPlayingStats = async function getSeasonPlayingStats(id){
    let stats = {}
    const fullUrl = urlPrefix + id + urlSeasonEnd;
    // console.log(fullUrl);
    try {
        const data = await axios.get(fullUrl);
        for(season of data.data.stats[0].splits) {
            if(season.league.name === 'National Hockey League'){
                let seasonStats = season.stat;
                if(!stats[season.season]){
                    stats[season.season] = {};
                }
                let team = _.replace(season.team.name,'\.','');
                stats[season.season][team] = seasonStats;
            }
        }
        return stats;
    } catch(err){
        if(err.response){
            console.log(`API did not return season stats for ${id}: `);
        } else {
            console.log(`API did not return season stats for ${id}: `, err);
        }
        return stats;
    }
}

module.exports.getCareerPlayingStats = async function getCareerPlayingStats(id){
    let stats = {}
    const fullUrl = urlPrefix + id + urlCareerEnd;
    // console.log(fullUrl);
    try {
        const data = await axios.get(fullUrl);
        // console.log(data.data.stats[0].splits[0].stat);
        if(data.data.stats[0].splits[0]){
            stats = data.data.stats[0].splits[0].stat
        } else {
            console.log(`API did not return career stats for ${id} : empty stats`);
        }
        return stats;
    } catch(err){
        console.log(`API did not return career stats for ${id} : `, err);
        return stats;
    }
}