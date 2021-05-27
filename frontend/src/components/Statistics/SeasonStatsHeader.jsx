import TeamComp from "../MultiUse/TeamComp";
import SeasonComp from "../MultiUse/TeamYearComp"

function SeasonStatsHeader(props) {
    return (
      <div className="input-group">
            <div className="form-check" style={{paddingRight: '1rem'}}>
              <input onClick={props.updateSeasonCheck} className="" type="checkbox" checked={props.sameseason} id="sameSeasonCheck" name="sameSeasonCheck" />
              <label className="pl-1" for="sameSeasonCheck">
                Same season
              </label>
            </div>
            <div>
              <SeasonComp name='statyear' style={{width: props.width}} idx={props.idx} value={props.statyearval} inputChange={props.inputChange}/>
            </div>
            <div >
              <TeamComp name="statteam" style={{width: props.width}} idx={props.idx} value={props.statteam} inputChange={props.inputChange}/>
            </div>
        </div>
    );
  }
  
  export default SeasonStatsHeader;