import TeamComp from '../MultiUse/TeamComp'
import PositionComp from './PositionComp'
import ShootsComp from './ShootsComp'
import BirthMonthComp from './BirthMonthComp'
import HomeCountry from './HomeCountry'



function PartialCharacteristicComp(props) {

  if(props.characteristic.startsWith('team')){
    return <TeamComp name="value" style={{width: props.width}} idx={props.idx} value={props.value} inputChange={props.inputChange}/>
  } else if(props.characteristic === 'position'){
    return <PositionComp style={{width: props.width}} idx={props.idx} value={props.value} inputChange={props.inputChange}/>
  } else if(props.characteristic === 'shoots'){
    return <ShootsComp style={{width: props.width}} idx={props.idx} value={props.value} inputChange={props.inputChange}/>
  } else if(props.characteristic === 'birthmonth'){
    return <BirthMonthComp style={{width: props.width}} idx={props.idx} value={props.value} inputChange={props.inputChange}/>
  } else if(props.characteristic === 'homecountry'){
    return <HomeCountry style={{width: props.width}} idx={props.idx} value={props.value} inputChange={props.inputChange}/>
  } else {
    return <input style={{width: props.width}} type="text"  class="form-control" name="value" value={props.value} onChange={event => props.inputChange(props.idx, event)}/>;

  }
}
  
  export default PartialCharacteristicComp;