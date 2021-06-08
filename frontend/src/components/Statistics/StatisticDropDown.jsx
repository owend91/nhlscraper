function StatisticDropDown(props) {
    return (
      <select name="statistic" className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
        <option selected>Statistic</option>
        <option value="seasongoals">Goals</option>
        <option value="seasonassists">Assists</option>
        <option value="seasonpoints">Points</option>
        <option value="seasonpim">PIM</option>
        <option value="seasonshots">Shots</option>
        <option value="seasongames">Games Played</option>
    </select>
    );
  }
  
  export default StatisticDropDown;