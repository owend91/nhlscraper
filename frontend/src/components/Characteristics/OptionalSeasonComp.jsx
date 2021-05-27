import SeasonComp from "../MultiUse/TeamYearComp"

function OptionalSeasonComp(props) {
    if(props.addSeason){
        return <SeasonComp name='teamyear' style={{width: props.width}} idx={props.idx} value={props.value} inputChange={props.inputChange}/>
    }
    return '';
  }
    
    export default OptionalSeasonComp;
        