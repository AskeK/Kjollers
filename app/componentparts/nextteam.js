


// Next team
const React = require( 'react' ),
      globals = require( '../globals.js' );

class NextTeam extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {};
    }

    // Format Data
    formatData( props, silent ) {

        this.days = [ 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag' ];
        this.months = [ 'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
                        'Juli', 'August', 'September', 'Oktober', 'November', 'December' ];

        // Set data
        props.teams.sort(( a, b ) => {
            if ( a.timestamp.getTime() > b.timestamp.getTime() ) return 1;
            if ( a.timestamp.getTime() < b.timestamp.getTime() ) return -1;
            return 0;
        });

        let data = props.teams[0];

        // Formats date
        let day, month, date, hours, minutes;
        if ( data.timestamp != null ) {

            // Formats day, month, date & time
            day = this.days[ data.timestamp.getDay()-1 ];
            month = this.months[ data.timestamp.getMonth() ];
            date = data.timestamp.getDate();
            hours = data.timestamp.getHours();
            minutes = data.timestamp.getMinutes();
            if ( minutes.toString().length < 2 ) minutes = '0'+minutes;

            // Plops it all together, into one BIIIG string:))
            if ( silent ) this.state.formattedTimeString = day + ' ' + date + '. ' + month + ' kl. ' + hours + ':' + minutes;
            else this.setState({ formattedTimeString : day + ' ' + date + '. ' + month + ' kl. ' + hours + ':' + minutes });


        }

        // Formats price
        if ( data.price != null ) {

            let arr = data.price.toString().split('').reverse(),
                response = [], counter = 0;

            for ( let iter = 0; iter < arr.length; iter++ ) {
                if ( counter == 3 ) {
                    response.push( '.' );
                    counter = 0;
                }

                response.push( arr[iter] );
                counter++;
            }

            if ( silent ) this.state.formattedPriceString = 'Pris ' +  response.reverse().join('') + 'kr.';
            else this.setState({ formattedPriceString : 'Pris ' + response.reverse().join('') + 'kr.' });

        }

    }

    // Render
    render() {
        return (
            <div className="nextteam" >
                <div className="nextteam-inner">
                    <div className="title">Næste hold med ledige pladser</div>
                    <div className="time">{ this.state.formattedTimeString != null && this.state.formattedTimeString }</div>
                    <div className="price">{ this.state.formattedPriceString != null && this.state.formattedPriceString }</div>
                    <a data-id={ globals.pagedatahandler.signupid } data-type='signup' data-slug={ globals.pagedatahandler.signupslug } className="btn">Tilmeld dig her</a>
                </div>
            </div>
        );
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        this.formatData( nextProps, false );
    }

    // Component did moutn
    componentDidMount() {
        this.formatData( this.props, false );
    }

} module.exports = NextTeam;
