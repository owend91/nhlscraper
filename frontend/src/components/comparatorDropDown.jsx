function ComparatorDropDown(props) {
    return (
      <select className="form-select" name='comparator' aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
        <option value="gt">{">"}</option>
        <option value="lt">{"<"}</option>
        <option value="ge">{">="}</option>
        <option value="le">{"<="}</option>
        <option value="eq">{"="}</option>
    </select>
    );
  }
  
  export default ComparatorDropDown;