import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from 'react-data-table-component'
import QueryParams from './components/QueryComponents/QueryComponent'

import PlayerDataService from "./services/players"
import { useState } from 'react';
import CustomStatDisplay from './components/Table/CustomStatDisplay';

function App() {

  const [sameSeason, setSameSeason] = useState(false);
  const [statYear, setStatYear] = useState('');
  const [statTeam, setStatTeam] = useState('');


  const [charFields, setCharFields] = useState([
    
  ]);
  const [statFields, setStatFields] = useState([
   
  ]);
  const [players, setPlayers] = useState([]);

  const handleAddCharFields = () => {
    const values = [...charFields];
    values.push({ value: '', characteristic: '', teamyear: '' });
    setCharFields(values);
  };
  const handleCharInputChange = (index, event) => {
    const values = [...charFields];
    if (event.target.name === "value") {
      values[index].value = event.target.value;
    } else if (event.target.name === "teamyear") {
      values[index].teamyear = event.target.value;
    } else {
      values[index].characteristic = event.target.value;
      values[index].value = "";
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
    if (event.target.name === "statvalue") {
      values[index].value = event.target.value;
      setStatFields(values);
    } else if(event.target.name === "statistic"){
      values[index].statistic = event.target.value;
      setStatFields(values);
    } else if(event.target.name === "comparator"){
      values[index].comparator = event.target.value;
      setStatFields(values);
    } else if(event.target.name === "statyear"){
      setStatYear(event.target.value);
    } else if(event.target.name === "statteam"){
      setStatTeam(event.target.value);
    }
    
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
          if(char.characteristic.startsWith('team')){
            if(char.teamyear !== ''){
              query+= `${char.characteristic}=${char.value}${char.teamyear}&&`;
            } else {
              query+= `${char.characteristic}=${char.value}ALL&&`;
            }
          } else {
            query+= `${char.characteristic}=${char.value.replace(' ', '%20')}&&`;
          }
          console.log(query);
          
        }
      });
      statFields.map(stat => {
        if(stat.statistic !== ''){
          query+= `${stat.statistic}=${stat.comparator}${stat.value}&&`;
        }
      });

      let statSeasonQueryString = '';
      if(sameSeason){
        statSeasonQueryString += 'sameseason=y';
      }
      if(statYear !== ''){
        const season = parseInt(statYear) + '' + (parseInt(statYear)+1);
        if(statSeasonQueryString !== ''){
          statSeasonQueryString += '&&statseason='+season
        } else {
          statSeasonQueryString += 'statseason='+season
        }
      }
      if(statTeam !== ''){
        if(statSeasonQueryString !== ''){
          statSeasonQueryString += '&&statteam='+statTeam
        } else {
          statSeasonQueryString += '&&statteam='+statTeam
        }
      }
      if(statSeasonQueryString !== ''){
        query += statSeasonQueryString
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
  // const ExpandableComponent = ({ players }) => {
  //   const columns2 = [
  //     {
  //       name: 'Goals',
  //       selector: 'goals',
  //       sortable: true,
  //     },
  //   ]
  //    return <DataTable
  //             title="Data"
  //             columns={columns2}
  //             data={players.stats}
  //             pagination={true}
  //             expandableRows
  //         />
  // }
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
          statyearval={statYear}
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
              expandableRows
              expandableRowsComponent={<CustomStatDisplay />}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
