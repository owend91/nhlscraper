function TeamComp(props) {
    return (
              <select style={{width: props.width}} name="value" value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
                <option selected>Select Position</option>
                <option value='c'>Center</option>
                <option value="lw">Left Wing</option>
                <option value="rw">Right Wing</option>
                <option value="d">Defenseman</option>
                <option value="g">Goalie</option>
            </select>
      
    );
  }
  
  export default TeamComp;
