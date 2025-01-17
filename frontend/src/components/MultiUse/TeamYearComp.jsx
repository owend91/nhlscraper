import Helper from '../../Helpers/Helper'

const seasons = Helper.getYears();
function SeasonComp(props) {
    return (
              
              <select style={{width: props.width}} name={props.name} value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
              <option value='' selected>Season</option>
            
              {seasons.map((season) => {
                  return <option value={season.key}>{season.val}</option>
                })   
                }
              </select>

      
    );
  }
  
  export default SeasonComp;
