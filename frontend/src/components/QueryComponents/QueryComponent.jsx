import BrowserQueryParams from './BrowserQueryParams'
import MobileQueryParams from './MobileQueryParams'

import {isMobile} from 'react-device-detect';

function QueryComponent(props) {
    // if(isMobile){
    //   return (
    //     <MobileQueryParams 
    //       handleAddCharFields={props.handleAddCharFields} 
    //       handleAddStatFields={props.handleAddStatFields}
    //       handleRemoveCharFields={props.handleRemoveCharFields}
    //       handleRemoveStatFields={props.handleRemoveStatFields}
    //       updateSeasonCheck={props.updateSeasonCheck}
    //       statFields={props.statFields}
    //       charFields={props.charFields}
    //       sameSeason={props.sameSeason}
    //       handleStatInputChange={props.handleStatInputChange}
    //       handleCharInputChange={props.handleCharInputChange}
    //       statyearval={props.statyearval}
    //       statteam={props.statteam}
    //       handleAddCareerStatFields={props.handleAddCareerStatFields}
    //       handleRemoveCareerStatFields={props.handleRemoveCareerStatFields}
    //       handleStatCareerInputChange={props.handleCareerStatInputChange}
    //       careerStatFields={props.careerStatFields}




    //     />
    //   )
    // } else {
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
          statyearval={props.statyearval}
          statteam={props.statteam}

          handleAddCareerStatFields={props.handleAddCareerStatFields}
          handleRemoveCareerStatFields={props.handleRemoveCareerStatFields}
          handleCareerStatInputChange={props.handleCareerStatInputChange}
          careerStatFields={props.careerStatFields}


        />
      )
    // }
  }
  
  export default QueryComponent;