import Characteristic from '../Characteristics/CompleteCharacteristicComp'
import SeasonStatsHeader from '../Statistics/SeasonStatsHeader'
import Statistic from '../Statistics/StatisticComp'

function BrowserQueryParams(props) {
    return (
      <div className='card'>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Characteristic Parameters</h5>
                  <div className="row pb-1">
                    <button className="btn btn-outline-primary" onClick={props.handleAddCharFields}> Add Property</button>
                  </div>
                  <div className="row pt-1" style={{maxHeight: '15em', overflowY:'scroll', width:'100%'}}>
                    {props.charFields.map( (char, index) => {
                      return (
                          <div class="row">
                            <Characteristic width={'5em'} idx={index} removeChar={props.handleRemoveCharFields} inputChange={props.handleCharInputChange} value={char.value} characteristic={char.characteristic} />
                          </div>   
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Statistic Parameters</h5>
                    <div className="row pb-1">
                      <button className="btn btn-outline-primary" onClick={props.handleAddStatFields}> Add Statistic</button>
                    </div>
                    <div className="row pt-1" style={{maxHeight: '15em', overflowY:'scroll', width:'100%'}}>
                        {props.statFields.map( (stat, index) => {
                          return (
                              <div class="row">
                                <Statistic idx={index} removeStat={props.handleRemoveStatFields} inputChange={props.handleStatInputChange} value={stat.value} statistic={stat.statistic} comparator={stat.comparator} />
                              </div>   
                          )
                        })}
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
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
                </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
  
  export default BrowserQueryParams;
