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
  const [careerStatFields, setCareerStatFields] = useState([
   
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

  const handleAddCareerStatFields = () => {
    const values = [...careerStatFields];
    values.push({ value: '', statistic: '', comparator: 'gt' });
    setCareerStatFields(values);
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

  const handleCareerStatInputChange = (index, event) => {
    const values = [...careerStatFields];
    if (event.target.name === "statvalue") {
      values[index].value = event.target.value;
      setCareerStatFields(values);
    } else if(event.target.name === "statistic"){
      values[index].statistic = event.target.value;
      setCareerStatFields(values);
    } else if(event.target.name === "comparator"){
      values[index].comparator = event.target.value;
      setCareerStatFields(values);
    } 
  }; 
  
  const handleRemoveStatFields = index => {
    const values = [...statFields];
    values.splice(index, 1);
    setStatFields(values);
  };

  const handleRemoveCareerStatFields = index => {
    const values = [...careerStatFields];
    values.splice(index, 1);
    setCareerStatFields(values);
  };

  function updateSeasonCheck(){
    setSameSeason(!sameSeason);
  }

  function preventFormSubmit(e){
    e.preventDefault();
  }

  function submitQuery() {
    if(charFields.length === 0 && statFields.length === 0 && careerStatFields.length === 0){
      PlayerDataService.getAll()
      .then(response => {
        console.log(response.data);
        setPlayers(response.data);
    })
    .catch(e => {
        console.log(e);
    });
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
      console.log('careerStatFields: ', careerStatFields)
      careerStatFields.map(stat => {
        if(stat.statistic !== ''){
          console.log(`career stat: ${stat.statistic}`)
          query+= `${stat.statistic}=${stat.comparator}${stat.value}&&`;
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
  ];
  return (
    <div className="App">
      {/* <div className="container"> */}
        <form onSubmit={preventFormSubmit}>
        <QueryParams 
          handleAddCharFields={handleAddCharFields} 
          handleAddStatFields={handleAddStatFields}
          handleAddCareerStatFields={handleAddCareerStatFields}
          handleRemoveCharFields={handleRemoveCharFields}
          handleRemoveStatFields={handleRemoveStatFields}
          handleRemoveCareerStatFields={handleRemoveCareerStatFields}
          updateSeasonCheck={updateSeasonCheck}
          statFields={statFields}
          careerStatFields={careerStatFields}
          charFields={charFields}
          sameSeason={sameSeason}
          handleStatInputChange={handleStatInputChange}
          handleCareerStatInputChange={handleCareerStatInputChange}
          handleCharInputChange={handleCharInputChange}
          statyearval={statYear}
        />
        <div className='container'>
          <div className="row pt-2 pb-4">
            <button onClick={submitQuery} className='btn btn-outline-success'>Submit</button>
          </div>
          </div>
        </form>
        <div className='container'>
          <div className="row">
              <DataTable
                title="Players"
                columns={columns}
                data={players}
                pagination={true}
                expandableRows
                expandableRowsComponent={<CustomStatDisplay />}
                noHeader={true}
                dense
            />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default App;
