function BirthMonthComp(props) {
    return (
              <select style={{width: props.width}} name="value" value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
                <option selected>Select Birth Month</option>
                <option value='jan'>January</option>
                <option value='feb'>February</option>
                <option value='mar'>March</option>
                <option value='apr'>April</option>
                <option value='may'>May</option>
                <option value='jun'>June</option>
                <option value='jul'>July</option>
                <option value='aug'>August</option>
                <option value='sep'>September</option>
                <option value='oct'>October</option>
                <option value='nov'>November</option>
                <option value='dec'>December</option>
            </select>
      
    );
  }
  
  export default BirthMonthComp;
