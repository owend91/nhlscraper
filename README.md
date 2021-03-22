# nhlscraper
This scrapes the nhl website to find player data and stores it into a local MongoDB db.
Now pulls all teams.  Each team is a collection that has a name and an array of Player collections. Each player has a map of teams played for, and an array of years with the team.

To populate local MongoDB:
1. Clone project
2. Run 'npm install'
3. Make sure MongoDB is running locally
4. Run 'node populateLocal.js' - This will empty the collection and re-insert everything

To run the API, simply start the nodejs server.  It is set to go against port 3001.  Make sure your database is populated before trying the API.

Current Data Stored:
  - Name
  - Number
  - Position
  - Shoots (Shooting side L/R)
  - Height
  - Weight
  - Birthdate
  - Hometown
  - Years (these are the seasons the player was on the team.  The year recorded is the first of the season.  For example the 2020-2021 season is recorded as 2020)

Currently Working On:
  - API calls
    - First call implemented. /playersbyteam/:team/:year Will return all players on a team for a given year.  If year is left off, all players to ever play on that team are returned
    - Second call: /playersonteams?team1=&team2=... Will return all players to play on all of the given teams. The arguments in the query string must begin with 'team'


Known Issues:
  - Height is stored twice (for example Nick Backstroms height is "6'1"6' 1"") [FIXED]
  - Birthdate is stored twice (for example Nick Backstroms birthdate is  "11/23/87Nov 23,1987") [FIXED]
  - The data is only current (for example, Braden Holtby was number 70 with the Capitals, he is now number 49 with Vancouver. 49 is stored in the database)


Next Steps:
  - Include stats for each year (GP, Goals, Assists, Points at a minimum per season)
  - Some sort of front end
