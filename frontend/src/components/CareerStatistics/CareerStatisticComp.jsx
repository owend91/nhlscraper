import CareerStatisticDropDown from './CareerStatisticDropDown'
import ComparatorDropDown from '../Statistics/ComparatorDropDown'


function CareerStatisticComp(props) {
    return (
          <div className="col-lg-12">
            <div className="input-group">
              <CareerStatisticDropDown idx={props.idx} inputChange={props.inputChange}/>
              <ComparatorDropDown idx={props.idx} inputChange={props.inputChange}/>
              <input type="text"  class="form-control" name="statvalue" value={props.value} onChange={event => props.inputChange(props.idx, event)}/>              
              <button className="btn btn-outline-danger" onClick={() => props.removeStat(props.idx)}> - </button>
            </div>
          </div>
    );
  }
  
  export default CareerStatisticComp;