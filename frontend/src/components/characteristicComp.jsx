import CharacteristicDropDown from './characteristicDropDown'

function CharacteristicComp(props) {
    return (
          <div className="col-lg-10">
            <div className="input-group">
              <CharacteristicDropDown idx={props.idx} inputChange={props.inputChange}/>
              <input type="text"  class="form-control" name="value" value={props.value} onChange={event => props.inputChange(props.idx, event)}/>
              {/* <input type="text"  class="form-control" name="characteristic" value={props.characteristic} onChange={event => props.inputChange(props.idx, event)}/> */}
              
              <button className="btn btn-outline-danger" onClick={() => props.removeChar(props.idx)}> - </button>
            </div>
          </div>
    );
  }
  
  export default CharacteristicComp;