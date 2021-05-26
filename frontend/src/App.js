import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Characteristic from './components/Characteristics/CompleteCharacteristicComp'
import Statistic from './components/Statistics/StatisticComp'

import PlayerDataService from "./services/players"
import { useState } from 'react';

function App() {
  const [sameSeason, setSameSeason] = useState(false);
  const [charFields, setCharFields] = useState([
    { value: '', characteristic: '' }
  ]);
  const [statFields, setStatFields] = useState([
    { value: '', statistic: '', comparator: 'gt' }
  ]);
  const [players, setPlayers] = useState([]);

  const handleAddCharFields = () => {
    const values = [...charFields];
    values.push({ value: '', characteristic: '' });
    setCharFields(values);
  };
  const handleCharInputChange = (index, event) => {
    const values = [...charFields];
    if (event.target.name === "value") {
      values[index].value = event.target.value;
    } else {
      values[index].characteristic = event.target.value;
    }
    setCharFields(values);
  }; 
  const handleRemoveCharFields = index => {
    const values = [...charFields];
    values.splice(index, 1);
    setCharFields(values);
  };


  const handleAddStatFields = () => {
    const values = [...statFields];
    values.push({ value: '', statistic: '', comparator: 'gt' });
    setStatFields(values);
  };
  const handleStatInputChange = (index, event) => {
    const values = [...statFields];
    console.log('event: ', event);
    if (event.target.name === "statvalue") {
      values[index].value = event.target.value;
    } else if(event.target.name === "statistic"){
      values[index].statistic = event.target.value;
    } else {
      values[index].comparator = event.target.value;
    }
    setStatFields(values);
  }; 
  const handleRemoveStatFields = index => {
    const values = [...statFields];
    values.splice(index, 1);
    setStatFields(values);
  };

  function updateSeasonCheck(){
    setSameSeason(!sameSeason);
  }

  function submitQuery(e) {
    alert('update players')
    if(charFields.length === 0 && statFields.length === 0){
      PlayerDataService.getAll();
    } else {
      console.log('chars: ', charFields);
      console.log('stats: ', statFields);
      let query = "";
      charFields.map(char => {
        if(char.characteristic !== ''){
          query+= `${char.characteristic}=${char.value.replace(' ', '%20')}&&`;
        }
      });
      statFields.map(stat => {
        if(stat.statistic !== ''){
          query+= `${stat.statistic}=${stat.comparator}${stat.value}&&`;
        }
      });
      if(sameSeason){
        console.log('sameseason');
        query += 'sameseason=y'
      } else {
        query = query.slice(0,query.length-2);
      }
    PlayerDataService.find(query)
      .then(response => {
        console.log(response.data);
        setPlayers(response.data);
    })
    .catch(e => {
        console.log(e);
    });
    }
    e.preventDefault();
    
  }
  return (
    <div className="App">
      <div className="container">
        <form onSubmit={submitQuery}>
        <div className="row">
          <div className="col-lg-6">
            <h3>Characteristic Parameters</h3>
            <div className="row pb-1">
                <button className="btn btn-outline-primary" onClick={handleAddCharFields}> Add Property</button>
              </div>
          </div>
          <div className="col-lg-6">
            <h3>Statistic Parameters</h3>
            <div className="row pb-1">
                <button className="btn btn-outline-primary" onClick={handleAddStatFields}> Add Statistic</button>
            </div>
          </div>
        </div>
        <div className="row" style={{maxHeight: '20em', overflowY:'scroll', width:'100%'}}>
            <div className="col-lg-6">
              
              {/* <h3>Characteristic Parameters</h3> */}


              {charFields.map( (char, index) => {
                return (
                    <div class="row">
                      <Characteristic width={'5em'} idx={index} removeChar={handleRemoveCharFields} inputChange={handleCharInputChange} value={char.value} characteristic={char.characteristic} />
                    </div>   
                )
              })}
              
            </div>
            <div className="col-lg-6">
              {/* <h3>Statistic Parameters</h3> */}
              
              <div className="row" style={{textAlign: 'center'}}>
              <div className="form-check" onClick={updateSeasonCheck}>
                <input className="" type="checkbox" checked={sameSeason} id="sameSeasonCheck" name="sameSeasonCheck" />
                <label className="pl-1" for="sameSeasonCheck">
                  Same season
                </label>
              </div>
              </div>
              {statFields.map( (stat, index) => {
                return (
                    <div class="row">
                      <Statistic idx={index} removeStat={handleRemoveStatFields} inputChange={handleStatInputChange} value={stat.value} statistic={stat.statistic} comparator={stat.comparator} />
                    </div>   
                )
              })}
            </div>
          </div>
          <div className="row pt-2">
            <button>Submit</button>
          </div>
        </form>
        <div className="row">
          <table className='table'>
            <thead>
              <tr>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              {players.map( player => {
                return (
                  <tr>
                    <td>{player.name}</td>
                  </tr>
                )}
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
