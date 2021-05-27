import CharacteristicDropDown from './CharacteristicDropDown'
import OptionalSeasonComp from './OptionalSeasonComp';
import PartialCharacteristicComp from './PartialCharacteristicComp'

function CharacteristicComp(props) {
    return (
          <div className="col-lg-12">
            <div className="input-group">
              <CharacteristicDropDown width={props.width} idx={props.idx} inputChange={props.inputChange}/>
              <PartialCharacteristicComp width={props.width} idx={props.idx} characteristic={props.characteristic} value={props.value} inputChange={props.inputChange}/>
              <OptionalSeasonComp addSeason={props.characteristic.startsWith('team')} width={props.width} idx={props.idx} inputChange={props.inputChange} />
              <button className="btn btn-outline-danger" onClick={() => props.removeChar(props.idx)}> - </button>
            </div>
          </div>
    );
  }
  
  export default CharacteristicComp;