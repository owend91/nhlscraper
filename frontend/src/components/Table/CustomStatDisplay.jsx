import DataTable from 'react-data-table-component'
function CustomStatDisplay(props) {
    console.log(props.data);
    const dat = [];
    for( const season of Object.keys(props.data.stats)){
        for( const team of Object.keys(props.data.stats[season])){
            const stats = {};
            for(const stat of Object.keys(props.data.stats[season][team])){
                stats[stat] = props.data.stats[season][team][stat];
            }
            dat.push({season: season, team: team, ...stats});
        }

    }
    console.log(dat);
    const columns = [
        {
            name: 'Season',
            selector: 'season',
            compact: true
        },
        {
            name: 'Team',
            selector: 'team',
            compact: true
        },
        {
            name: 'Goals',
            selector: 'goals',
            compact: true
        },
        {
            name: 'Assists',
            selector: 'assists',
            compact: true
        },
        {
            name: 'Points',
            selector: 'points',
            compact: true
        },
        {
            name: 'Games',
            selector: 'games',
            compact: true
        },
        {
            name: 'PIM',
            selector: 'pim',
            compact: true
        },
        {
            name: 'Shots',
            selector: 'shots',
            compact: true
        },
        {
            name: 'Hits',
            selector: 'hits',
            compact: true
        },
        {
            name: 'Shifts',
            selector: 'shifts',
            compact: true
        },
    ]
    return (
        <div>
            <DataTable
                title="Stats"
                columns={columns}
                data={dat}
                pagination={true}
                dense
                noHeader={true}
            />
          </div>
    );
  }
  
  export default CustomStatDisplay;