const seasons = {}
module.exports.getYears = function getYears(){
    if(Object.keys(seasons).length !== 0){
        return seasons;
    }
    let currYear = new Date().getFullYear();
    while (currYear > 1917) {
        let lastYear = currYear - 1;
        seasons[lastYear] = lastYear + " - " + currYear;
        currYear = lastYear;
      
    }
    return seasons;
}