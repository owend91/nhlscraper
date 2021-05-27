import DataTable from 'react-data-table-component'
function CustomStatDisplay(props) {
    // console.log(props.data);
    const dat = [];
    for( const season of Object.keys(props.data.stats)){
        const displaySeason = season.substring(0,4) + "-" + season.substring(4)
        for( const team of Object.keys(props.data.stats[season])){
            const stats = {};
            for(const stat of Object.keys(props.data.stats[season][team])){
                stats[stat] = props.data.stats[season][team][stat];
            }
            dat.push({season: displaySeason, team: team, ...stats});
        }

    }
    const columns = [
        {
            name: 'Season',
            selector: 'season',
            compact: true,
            center: true
        },
        {
            name: 'Team',
            selector: 'team',
            compact: true,
            center: true
        },
        {
            name: 'Goals',
            selector: 'goals',
            compact: true,
            center: true
        },
        {
            name: 'Assists',
            selector: 'assists',
            compact: true,
            center: true
        },
        {
            name: 'Points',
            selector: 'points',
            compact: true,
            center: true
        },
        {
            name: 'Games',
            selector: 'games',
            compact: true,
            center: true
        },
        {
            name: 'PIM',
            selector: 'pim',
            compact: true,
            center: true
        },
        {
            name: 'Shots',
            selector: 'shots',
            compact: true,
            center: true
        },
        {
            name: 'Hits',
            selector: 'hits',
            compact: true,
            center: true
        },
        {
            name: 'Shifts',
            selector: 'shifts',
            compact: true,
            center: true
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