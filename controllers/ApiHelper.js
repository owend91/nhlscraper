module.exports.statComparator = function statComparator(player, stat, comparator, value1) {
    // console.log(stat);
       for(const[key, season] of player.stats){
          //loop through teams
          let goalCount = 0;
          for (const [team, stats] of Object.entries(season)) {
            goalCount += parseInt(stats[stat]);
             if(compareTo(comparator, goalCount, value1)){
              return true;
            }
          }
      }
    
}


function compareTo(comparator, value1, value2){
    if(comparator === 'gt'){
      return value1 > value2;
    } else if(comparator === 'lt'){
      return value1 < value2;
    } else if(comparator === 'eq'){
      return value1 === value2;
    } else if(comparator === 'ge'){
      return value1 >= value2;
    } else if(comparator === 'le'){
      return value1 <= value2;
    }
  }
  