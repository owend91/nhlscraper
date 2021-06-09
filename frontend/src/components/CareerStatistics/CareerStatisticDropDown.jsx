function StatisticDropDown(props) {
    return (
      <select name="statistic" className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
        <option selected>Stat</option>
        <option value="careergoals">Goals</option>
        <option value="careerassists">Assists</option>
        <option value="careerpoints">Points</option>
        <option value="careerpim">PIM</option>
        <option value="careershots">Shots</option>
        <option value="careergames">Games Played</option>
    </select>
    );
  }
  
  export default StatisticDropDown;