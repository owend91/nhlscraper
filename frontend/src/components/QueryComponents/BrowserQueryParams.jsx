import Characteristic from '../Characteristics/CompleteCharacteristicComp'
import Statistic from '../Statistics/StatisticComp'

function BrowserQueryParams(props) {
    return (
      <div>
        <div className="row">
        <div className="col-lg-6">
          <h3>Characteristic Parameters</h3>
          <div className="row pb-1">
              <button className="btn btn-outline-primary" onClick={props.handleAddCharFields}> Add Property</button>
            </div>
        </div>
        <div className="col-lg-6">
          <h3>Statistic Parameters</h3>
          <div className="row pb-1">
              <button className="btn btn-outline-primary" onClick={props.handleAddStatFields}> Add Statistic</button>
          </div>
        </div>
      </div>
      <div className="row" style={{maxHeight: '15em', overflowY:'scroll', width:'100%'}}>
          <div className="col-lg-6">
            
            {/* <h3>Characteristic Parameters</h3> */}


            {props.charFields.map( (char, index) => {
              return (
                  <div class="row">
                    <Characteristic width={'5em'} idx={index} removeChar={props.handleRemoveCharFields} inputChange={props.handleCharInputChange} value={char.value} characteristic={char.characteristic} />
                  </div>   
              )
            })}
            
          </div>
          <div className="col-lg-6">
            {/* <h3>Statistic Parameters</h3> */}
            
            <div className="row" style={{textAlign: 'center'}}>
            <div className="form-check" onClick={props.updateSeasonCheck}>
              <input className="" type="checkbox" checked={props.sameSeason} id="sameSeasonCheck" name="sameSeasonCheck" />
              <label className="pl-1" for="sameSeasonCheck">
                Same season
              </label>
            </div>
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
      
    );
  }
  
  export default BrowserQueryParams;
