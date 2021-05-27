
function TeamComp(props) {
    return (
                <select style={{width: props.width}} name={props.name} value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
                  <option value='' selected>Select Team</option>
                  <option value="avalanche">Avalanche</option>
                  <option value="blackhawks">Blackhawks</option>
                  <option value="bluejackets">Blue Jackets</option>
                  <option value="blues">Blues</option>
                  <option value='bruins'>Bruins</option>
                  <option value="canadiens">Canadiens</option>
                  <option value="canucks">Canucks</option>
                  <option value="capitals">Capitals</option>
                  <option value="coyotes">Coyotes</option>
                  <option value="devils">Devils</option>
                  <option value="ducks">Ducks</option>
                  <option value="flames">Flames</option>
                  <option value="flyers">Flyers</option>
                  <option value="goldenknights">Golden Knights</option>
                  <option value="hurricanes">Hurricanes</option>
                  <option value="islanders">Islanders</option>
                  <option value="jets">Jets</option>
                  <option value="kings">Kings</option>
                  <option value="lightning">Lightning</option>
                  <option value="mapleleafs">Maple Leafs</option>
                  <option value="oilers">Oilers</option>
                  <option value="panthers">Panthers</option>
                  <option value="penguins">Penguins</option>
                  <option value="predators">Predators</option>
                  <option value="rangers">Rangers</option>
                  <option value="redwings">Redwings</option>
                  <option value="sabres">Sabres</option>
                  <option value="senators">Senators</option>
                  <option value="sharks">Sharks</option>
                  <option value="stars">Stars</option>
                  <option value="wild">Wild</option>
              </select>
    );
  }
  
  export default TeamComp;
