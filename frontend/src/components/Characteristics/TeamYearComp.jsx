import Helper from '../../Helpers/Helper'

const seasons = Helper.getYears();
function SeasonComp(props) {
    return (
              
              <select style={{width: props.width}} name="teamyear" value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
              <option selected>Select Season</option>
            
              {seasons.map((season) => {
                  return <option value={season.key}>{season.val}</option>
                })   
                }
              </select>

      
    );
  }
  
  export default SeasonComp;
