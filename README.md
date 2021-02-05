# nhlscraper
This scrapes the nhl website to find player data and stores it into a local MongoDB db.
Now pulls all teams.  Each team is a collection that has a name and an array of Player collections.

To run:
1. Clone project
2. Run 'npm install'
3. Make sure MongoDB is running locally 
4. Run 'node populateLocal.js' - This will empty the collection and re-insert everything

You can also deploy the app.js as an express server, and when you get '/' it'll reload the database.

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


Known Issues:
  - Height is stored twice (for example Nick Backstroms height is "6'1"6' 1"")
  - Birthdate is stored twice (for example Nick Backstroms birthdate is  "11/23/87Nov 23,1987")
  - The data is only current (for example, Braden Holtby was number 70 with the Capitals, he is now number 49 with Vancouver. 49 is stored in the database)
  - Players with the same name are merged into the same object


Next Steps:
  - Include stats for each year (GP, Goals, Assists, Points at a minimum per season)
  - Some sort of front end
  - Update the player object to include a teams object that will include the team and the years the player was with that team.
