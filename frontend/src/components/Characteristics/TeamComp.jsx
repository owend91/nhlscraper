
function TeamComp(props) {
    return (
                <select style={{width: props.width}} name="value" value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
                  <option selected>Select Team</option>
                  <option value='bruins'>Bruins</option>
                  <option value="sabres">Sabres</option>
                  <option value="devils">Devils</option>
                  <option value="islanders">Islanders</option>
                  <option value="rangers">Rangers</option>
                  <option value="flyers">Flyers</option>
                  <option value="penguins">Penguins</option>
                  <option value="capitals">Capitals</option>
                  <option value="hurricanes">Hurricanes</option>
                  <option value="blackhawks">Blackhawks</option>
                  <option value="bluejackets">Blue Jackets</option>
                  <option value="stars">Stars</option>
                  <option value="redwings">Redwings</option>
                  <option value="panthers">Panthers</option>
                  <option value="predators">Predators</option>
                  <option value="lightning">Lightning</option>
                  <option value="ducks">Ducks</option>
                  <option value="coyotes">Coyotes</option>
                  <option value="avalanche">Avalanche</option>
                  <option value="kings">Kings</option>
                  <option value="wild">Wild</option>
                  <option value="sharks">Sharks</option>
                  <option value="blues">Blues</option>
                  <option value="goldenknights">Golden Knights</option>
                  <option value="flames">Flames</option>
                  <option value="oilers">Oilers</option>
                  <option value="canadiens">Canadiens</option>
                  <option value="senators">Senators</option>
                  <option value="mapleleafs">Maple Leafs</option>
                  <option value="canucks">Canucks</option>
                  <option value="jets">Jets</option>
              </select>


      
    );
  }
  
  export default TeamComp;
