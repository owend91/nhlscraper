// const seasons = {}
const seasons = [];
module.exports.getYears = function getYears(){
    if(seasons.length !== 0){
        return seasons;
    }
    // let year = 1917;
    //update currYear to be the next year when the next season starts
    let currYear = new Date().getFullYear();
    // while (year < currYear) {
    //     let nextYear = year + 1;
    //     let seasonString = year + " - " + nextYear;
    //     seasons.push ({key: year, val: seasonString});
    //     year = nextYear;
    // }
    while (currYear > 1917) {
        let prevYear = currYear - 1;
        let seasonString = prevYear + " - " + currYear;
        seasons.push ({key: prevYear, val: seasonString});
        currYear = prevYear;
    }

    return seasons;
}