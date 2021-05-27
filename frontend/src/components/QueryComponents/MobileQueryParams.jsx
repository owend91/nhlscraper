import Characteristic from '../Characteristics/CompleteCharacteristicComp'
import SeasonStatsHeader from '../Statistics/SeasonStatsHeader';
import Statistic from '../Statistics/StatisticComp'

function MobileQueryParams(props) {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h3>Characteristic Parameters</h3>
            <div className="row pb-1">
                <button className="btn btn-outline-primary" onClick={props.handleAddCharFields}> Add Property</button>
              </div>
          </div>
          <div className='row' style={{maxHeight: '7em', overflowY:'scroll', width:'100%'}}>
          {props.charFields.map( (char, index) => {
              return (
                  <div class="row">
                    <Characteristic width={'5em'} idx={index} removeChar={props.handleRemoveCharFields} inputChange={props.handleCharInputChange} value={char.value} characteristic={char.characteristic} />
                  </div>   
              )
            })}
            </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h3>Statistic Parameters</h3>
            <div className="row pb-1">
              <button className="btn btn-outline-primary" onClick={props.handleAddStatFields}> Add Statistic</button>
            </div>
            <div className="row" style={{textAlign: 'center', maxHeight: '7em', overflowY:'scroll', width:'100%'}}>
            {/* <div className="form-check" onClick={props.updateSeasonCheck}>
              <input className="" type="checkbox" checked={props.sameSeason} id="sameSeasonCheck" name="sameSeasonCheck" />
              <label className="pl-1" for="sameSeasonCheck">
                Same season
              </label>
            </div> */}
            <div className="row" style={{textAlign: 'center'}}>
            <SeasonStatsHeader 
              sameseason={props.sameseason}
              updateSeasonCheck={props.updateSeasonCheck}
              idx={-99}
              width={'5em'}
              statyearval={props.statyearval}
              inputChange={props.handleStatInputChange}
              statteam={props.statteam}
            />
            </div>
            {props.statFields.map( (stat, index) => {
              return (
                  <div class="row">
                    <Statistic idx={index} removeStat={props.handleRemoveStatFields} inputChange={props.handleStatInputChange} value={stat.value} statistic={stat.statistic} comparator={stat.comparator} />
                  </div>   
              )
            })}
            </div>
            
          </div>
        </div>
      </div>
      
    );
  }
  
  export default MobileQueryParams;
