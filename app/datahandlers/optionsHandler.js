


// Options handler
class OptionsHandler {

    // Constructor
    constructor() {
        this.options = { };
        this.rest_api = site_data.rest_api;
    }

    // Get
    Get( options ) {
        return new Promise((( resolve, reject ) => {

            let request = new XMLHttpRequest();
            request.onload = (( data ) => {

                let json = JSON.parse( data.target.response );
                this.options = json;
                resolve( json );

            });

            request.open( 'GET', this.rest_api+'options?options='+options );
            request.send();

        }).bind(this));
    }

} module.exports = OptionsHandler;
