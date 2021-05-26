function ShootsComp(props) {
    return (
              <select style={{width: props.width}} name="value" value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
                <option selected>Select Hand</option>
                <option value='l'>Left</option>
                <option value="r">Right</option>
            </select>
      
    );
  }
  
  export default ShootsComp;
