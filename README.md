# nhlscraper
This scrapes the nhl website to find player data and stores it into a local MongoDB db.
Now pulls all teams.  Each team is a collection that has a name and an array of Player collections. Each player has a map of teams played for, and an array of years with the team.

The front end is a react app saved in the frontend folder.  This allows you to add parameters that are sent to the API.  The results are shown in a datatable, where the rows can be expanded to show stats.  Add a .env to the frontend folder that contains the API path.

I currently have the API hosted on Heroku, and the React App on netlify.

To populate local MongoDB:
1. Clone project
2. Run 'npm install'
3. Create a .env in the directory, add a MONGO_URL property that points to your mongoDB, whether local or on the cloud
4. If running locally, make sure MongoDB is running locally
5. Run 'node populateLocal.js' - This will empty the collection and re-insert everything

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
  - Stats (NEW! This is being pulled from the NHL API). This is being pulled by season, per team. For example, Anthony Mantha traded to the Capitals from the Red Wings will have two stat objects for the 20202021 season.

Currently Working On:
  - API calls
    - First call implemented. /playersbyteam/:team/:year Will return all players on a team for a given year.  If year is left off, all players to ever play on that team are returned
    - Second call: /playersonteams?team1=&team2=... Will return all players to play on all of the given teams. The arguments in the query string must begin with 'team'
    - Third call: /players? where the queries can be any number of teams (team1=, team2=...), weight, birthmonth (jan, feb, mar ...), shoots (l,r),
    and position (d, lw, rw, c, g), number and name.  Updated: you can also now add a query for any stat in a season (that is returned under the stat key.  If you add multiple, they will return if a player has ever had a season for each of the conditions, does not have to be the same season).  They field needs to be started with 'season' to indicate the query is against a single season (ie. seasongoals=[comparator][number] where comparator is gt, ge, lt, le, eq and number is the number of goals to compare to).  If you want to check that the player had all the stats in a single season, add the param "sameseason=y"


Known Issues:
  - Height is stored twice (for example Nick Backstroms height is "6'1"6' 1"") [FIXED]
  - Birthdate is stored twice (for example Nick Backstroms birthdate is  "11/23/87Nov 23,1987") [FIXED]
  - The data is only current (for example, Braden Holtby was number 70 with the Capitals, he is now number 49 with Vancouver. 49 is stored in the database)
  - 14 players do not return stats from the NHL API
  - Turns out the NHL API was silently rejecting some calls.  To get all stats, the populateTables.js will scrape the NHL stats career stats table.  This has to be done after render, so Puppeteer is being used.  This does make the repopulation of the table take a long time now.


Next Steps:
  - Include stats for each year (GP, Goals, Assists, Points at a minimum per season) [DONE]
  - Some sort of front end [BASICS DONE]
  - Expand API calls 
  - Include overall stats on the main player object [DONE]
  - Have a flag where stat queries apply to a single season [DONE]
  - Add career stats to object [DONE]
  - Add career stats to front end
  - Figure out a way to only repopulate a subset of data.  For example, if last season played is a year or two before current year, don't delete and dont run NHL API against.
