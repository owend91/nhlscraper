const cheerio = require('cheerio');
const _ = require('lodash');
const axios = require('axios');

const urlPrefix = "https://statsapi.web.nhl.com/api/v1/people/"
const urlEnd = "/stats?stats=yearByYear";

module.exports.getPlayingStats = async function getPlayingStats(id){
    let stats = {}
    const fullUrl = urlPrefix + id + urlEnd;
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
        console.log(`API did not return stats for ${id}`);
        return stats;
    }
}