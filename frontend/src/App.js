import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import Characteristic from './components/Characteristics/CompleteCharacteristicComp'
// import Statistic from './components/Statistics/StatisticComp'
import DataTable from 'react-data-table-component'
import QueryParams from './components/QueryComponents/QueryComponent'

import PlayerDataService from "./services/players"
import { useState } from 'react';
// import {isMobile} from 'react-device-detect';

function App() {

  const [sameSeason, setSameSeason] = useState(false);
  const [charFields, setCharFields] = useState([
    
  ]);
  const [statFields, setStatFields] = useState([
   
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

  function preventFormSubmit(e){
    e.preventDefault();
  }

  function submitQuery() {
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
  }

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Birth Date',
      selector: 'birthdate',
      sortable: true,
    },
    {
      name: 'Height',
      selector: 'height',
      sortable: true,
    },
    {
      name: 'Hometown',
      selector: 'hometown',
      sortable: true,
    },
    {
      name: 'Position',
      selector: 'position',
      sortable: true,
    },
    {
      name: 'Shoots',
      selector: 'shoots',
      sortable: true,
    },
    {
      name: 'Number',
      selector: 'number',
      sortable: true,
    },
  ];
  return (
    <div className="App">
      <div className="container">
        <form onSubmit={preventFormSubmit}>
        <QueryParams 
          handleAddCharFields={handleAddCharFields} 
          handleAddStatFields={handleAddStatFields}
          handleRemoveCharFields={handleRemoveCharFields}
          handleRemoveStatFields={handleRemoveStatFields}
          updateSeasonCheck={updateSeasonCheck}
          statFields={statFields}
          charFields={charFields}
          sameSeason={sameSeason}
          handleStatInputChange={handleStatInputChange}
          handleCharInputChange={handleCharInputChange}
        />
          <div className="row pt-2">
            <button onClick={submitQuery} className='btn btn-outline-success'>Submit</button>
          </div>
        </form>
        <div className="row">
            <DataTable
              title="Players"
              columns={columns}
              data={players}
              pagination={true}
          />
          {/* <table className='table'>
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
          </table> */}
        </div>
      </div>
    </div>
  );
}

export default App;
