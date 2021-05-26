function CharacteristicDropDown(props) {
    return (
      <select style={{width: props.width, minWidth: props.width}} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
        <option selected>Characteristic</option>
        <option value={'team'+props.idx}>Team</option>
        <option value="position">Position</option>
        <option value="shoots">Shoots</option>
        <option value="number">Number</option>
        <option value="name">Name</option>
        <option value="birthmonth">Birth Month</option>
        <option value="weight">Weight</option>
        <option value="homecountry">Home Country</option>
    </select>
    );
  }
  
  export default CharacteristicDropDown;