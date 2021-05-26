import BrowserQueryParams from './BrowserQueryParams'
import MobileQueryParams from './MobileQueryParams'

import {isMobile} from 'react-device-detect';

function QueryComponent(props) {
    if(isMobile){
      return (
        <MobileQueryParams 
          handleAddCharFields={props.handleAddCharFields} 
          handleAddStatFields={props.handleAddStatFields}
          handleRemoveCharFields={props.handleRemoveCharFields}
          handleRemoveStatFields={props.handleRemoveStatFields}
          updateSeasonCheck={props.updateSeasonCheck}
          statFields={props.statFields}
          charFields={props.charFields}
          sameSeason={props.sameSeason}
          handleStatInputChange={props.handleStatInputChange}
          handleCharInputChange={props.handleCharInputChange}
        />
      )
    } else {
      return (
        <BrowserQueryParams 
          handleAddCharFields={props.handleAddCharFields} 
          handleAddStatFields={props.handleAddStatFields}
          handleRemoveCharFields={props.handleRemoveCharFields}
          handleRemoveStatFields={props.handleRemoveStatFields}
          updateSeasonCheck={props.updateSeasonCheck}
          statFields={props.statFields}
          charFields={props.charFields}
          sameSeason={props.sameSeason}
          handleStatInputChange={props.handleStatInputChange}
          handleCharInputChange={props.handleCharInputChange}
        />
      )
    }
  }
  
  export default QueryComponent;