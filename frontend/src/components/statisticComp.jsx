import StatisticDropDown from './statisticDropDown'
import ComparatorDropDown from './comparatorDropDown'


function StatisticComp(props) {
    return (
          <div className="col-lg-10">
            <div className="input-group">
              <StatisticDropDown idx={props.idx} inputChange={props.inputChange}/>
              <ComparatorDropDown idx={props.idx} inputChange={props.inputChange}/>
              <input type="text"  class="form-control" name="statvalue" value={props.value} onChange={event => props.inputChange(props.idx, event)}/>              
              <button className="btn btn-outline-danger" onClick={() => props.removeStat(props.idx)}> - </button>
            </div>
          </div>
    );
  }
  
  export default StatisticComp;