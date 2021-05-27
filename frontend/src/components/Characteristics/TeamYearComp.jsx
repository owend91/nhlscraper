import Helper from '../../Helpers/Helper'

const years = Helper.getYears();
function SeasonComp(props) {
    return (
              
              <select style={{width: props.width}} name="teamyear" value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
              <option selected>Select Season</option>
              {Object.keys(years).map((key) => {
                  return <option value={key}>{years[key]}</option>
                })   
                }
              </select>

      
    );
  }
  
  export default SeasonComp;
