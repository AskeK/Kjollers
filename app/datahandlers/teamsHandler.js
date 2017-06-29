


// Teams handler
class TeamsDataHandler {

    // Constructor
    constructor() {
        this.rest_api = site_data.rest_api;
        this.teams = [];
        this.getTeams();
    }

    // Get teams
    getTeams() {
        return new Promise((( resolve, reject ) => {

            let request = new XMLHttpRequest();
            request.onload = (( response ) => {

                let types = {
                    'car' : 'Bil',
                    'rec' : 'Generhvervelse',
                    'test' : 'Kontrollerende prøve',
                    'ban' : 'Kørselsforbud',
                    'cpr' : 'Førstehjælp'
                };

                let json = JSON.parse( response.target.response );
                this.teams = [];

                for ( let iter = 0; iter < json.length; iter++ ) {

                    let tmp = {
                        id : json[iter].type,
                        timestamp : new Date( json[iter].date ),
                        price : parseInt( json[iter].price ),
                        type : types[ json[iter].type ]
                    };

                    tmp.timestamp.setHours( parseInt( json[ iter ].hours ) );
                    tmp.timestamp.setMinutes( parseInt( json[ iter ].minutes ) );
                    this.teams.push( tmp );

                } resolve( this.teams );

            });

            request.open( 'GET', this.rest_api+'teams' );
            request.send();

        }).bind( this ));
    }

} module.exports = TeamsDataHandler;
