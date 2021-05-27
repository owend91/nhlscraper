module.exports.statComparator = function statComparator(player, stat, comparator, value1, inputTeam, inputSeason) {
    // console.log(stat);
    // console.log('stat comparator');
       for(const[key, season] of player.stats){
        // console.log('season: ' + key + '; inputTeam: ' + inputTeam);
        if(key !== inputSeason && inputSeason !== ''){ continue; }
          //loop through teams
          let goalCount = 0;
          for (const [team, stats] of Object.entries(season)) {
            console.log('team: ' + team + '; inputTeam: ' + inputTeam);
            if(team !== inputTeam && inputTeam !== ''){ continue; }
            goalCount += parseInt(stats[stat]);
             if(compareTo(comparator, goalCount, value1)){
              return true;
            }
          }
      }
}

module.exports.statComparatorSameSeason = function statComparatorSameSeason(player, otherParams, req) {
    for(const[key, season] of player.stats){
      let statTotals = {};
      for (const [team, stats] of Object.entries(season)) {
        for (const [stat, value] of Object.entries(stats)) {
          if(statTotals[stat]){
            statTotals[stat] += value;
          } else {
            statTotals[stat] = value
          }
        }
      }
      let match = true;
      for(const param of otherParams){
        let value = statTotals[param.slice(6)];
        if(param.startsWith("season")){
          const value2 = parseInt(req.query[param].slice(2));
          const comparator = req.query[param].slice(0,2);
          if(!compareTo(comparator, value, value2)){
            match = false;
            break;
          } else {
          }
        }
      }
      if(match){
        return true;
      }
  }
  return false; 
}

module.exports.statComparatorSameSeasonWithTeamSeason = function statComparatorSameSeasonWithTeamSeason(player, otherParams, inputTeam, inputSeason, req) {
  console.log(`statseason : ${inputSeason}`)
  console.log(`statteam : ${inputTeam}`)

  for(const[key, season] of player.stats){
    // console.log(key + ': ' + inputSeason);
    if(key !== inputSeason && inputSeason !== ''){ continue; }
    // console.log('looking at season: ', key);


    let statTotals = {};
    for (const [team, stats] of Object.entries(season)) {
      if(team !== inputTeam && inputTeam !== ''){ continue; }
      for (const [stat, value] of Object.entries(stats)) {
        if(statTotals[stat]){
          statTotals[stat] += value;
        } else {
          statTotals[stat] = value
        }
      }
    }
    let match = true;
    for(const param of otherParams){
      let value = statTotals[param.slice(6)];
      if(param.startsWith("season")){
        const value2 = parseInt(req.query[param].slice(2));
        const comparator = req.query[param].slice(0,2);
        if(!compareTo(comparator, value, value2)){
          match = false;
          break;
        } else {
        }
      }
    }
    if(match){
      return true;
    }
}
return false; 
}


function compareTo(comparator, value1, value2){
    if(comparator.toLowerCase() === 'gt'){
      return value1 > value2;
    } else if(comparator.toLowerCase() === 'lt'){
      return value1 < value2;
    } else if(comparator.toLowerCase() === 'eq'){
      return value1 === value2;
    } else if(comparator.toLowerCase() === 'ge'){
      return value1 >= value2;
    } else if(comparator.toLowerCase() === 'le'){
      return value1 <= value2;
    }
  }
  