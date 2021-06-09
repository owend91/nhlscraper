import Characteristic from '../Characteristics/CompleteCharacteristicComp'
import SeasonStatsHeader from '../Statistics/SeasonStatsHeader'
import Statistic from '../Statistics/StatisticComp'
import CareerStatistic from '../CareerStatistics/CareerStatisticComp'


function BrowserQueryParams(props) {
    return (
      <div className='card'>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Characteristic Parameters</h5>
                  <div className="row pb-1">
                    <button className="btn btn-outline-primary" onClick={props.handleAddCharFields}> Add Property</button>
                  </div>
                  <div className="row pt-1" style={{maxHeight: '15em', overflowY:'scroll', width:'110%'}}>
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
            <div className="col-lg-4 col-sm-12">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Season Statistic Parameters</h5>
                    <div className="row pb-1">
                      <button className="btn btn-outline-primary" onClick={props.handleAddStatFields}> Add Statistic</button>
                    </div>
                    <div className="row pt-1" style={{maxHeight: '15em', overflowY:'scroll', width:'110%'}}>
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
            <div className="col-lg-4 col-sm-12">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Career Statistic Parameters</h5>
                    <div className="row pb-1">
                      <button className="btn btn-outline-primary" onClick={props.handleAddCareerStatFields}> Add Statistic</button>
                    </div>
                    <div className="row pt-1" style={{maxHeight: '15em', overflowY:'scroll', width:'110%'}}>
                        {props.careerStatFields.map( (stat, index) => {
                          return (
                              <div class="row">
                                <CareerStatistic idx={index} removeStat={props.handleRemoveCareerStatFields} inputChange={props.handleCareerStatInputChange} value={stat.value} statistic={stat.statistic} comparator={stat.comparator} />
                              </div>   
                          )
                        })}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
  
  export default BrowserQueryParams;
