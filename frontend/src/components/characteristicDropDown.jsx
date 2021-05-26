function CharacteristicDropDown(props) {
    return (
      <select className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
        <option selected>Characteristic</option>
        <option value={'team'+props.idx}>Team</option>
        <option value="position">Position</option>
        <option value="shoots">Shoots</option>
        <option value="number">Number</option>
        <option value="name">Name</option>
        <option value="birthmonth">Birthmonth</option>
        <option value="weight">Weight</option>
    </select>
    );
  }
  
  export default CharacteristicDropDown;