


// Teams
const React = require( 'react' ),
      globals = require( '../globals.js' ),
      NextTeam = require( '../componentParts/nextteam.js' ),
      UpcomingTeams = require( '../componentParts/upcomingteams.js' );

class Teams extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
        };
    }

    // Render
    render() {
        return (
            <div className="teams">
                <div className="teams-inner">
                    { globals.teamsdatahandler.teams != null && globals.teamsdatahandler.teams.length > 0 && <NextTeam teams={ globals.teamsdatahandler.teams } /> }
                    { globals.teamsdatahandler.teams != null && globals.teamsdatahandler.teams.length > 0 && <UpcomingTeams teams={ globals.teamsdatahandler.teams } /> }
                </div>
            </div>
        );
    }

} module.exports = Teams;
