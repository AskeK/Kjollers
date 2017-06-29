


// Upcoming Teams
const React = require( 'react' ),
      _ = require( '../libaries/underscore/underscore_main.js' );

class UpcomingTeams extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            jsxTeams : null,
            mobile : false,
        };

        _(window).on('resize', this.onresize.bind(this));

    }

    // On resize
    onresize() {
        if ( window.innerWidth <= 720 && this.state.mobile == false ) {
            this.setState({ mobile : true });
        } else if ( window.innerWidth > 720 && this.state.mobile == true ) {
            this.setState({ mobile : false });
        }
    }

    // Check filter
    checkFilter( elem, filter ) {
        if ( filter != null ) {
            for ( let key in filter ) {
                if ( filter.hasOwnProperty( key ) && elem.hasOwnProperty( key ) ) {
                    if ( elem[key] !== filter[key] ) return false;
                }
            }
        }

        return true;
    }

    // Update JSX Elems
    updateElems( uteams, filter ) {

        if ( uteams != null ) {

            let newArr = [];
            for ( let iter = 0; iter < uteams.length; iter++ ) {
                if ( this.checkFilter( uteams[ iter ], filter ) ) newArr.push( uteams[iter] );
            }

            // Sorts teams after time
            newArr.sort(( a, b ) => {
                if ( a.timestamp.getTime() > b.timestamp.getTime() ) return 1;
                if ( a.timestamp.getTime() < b.timestamp.getTime() ) return -1;
                return 0;
            });

            // Removes past teams
            for ( let iter = 0; iter < newArr.length; iter++ ) {
                if ( newArr[ iter ].timestamp.getTime() < new Date().getTime() ) {
                    newArr.splice( iter, 1 );
                    iter --;
                }
            }

            // Gets three nearest
            let teams = newArr.slice( 0, 3 ),
                jsxTeams = [ ], jsxSelectTeams = [ ];

            // Creates jsx elems
            for ( let iter = 0; iter < teams.length; iter++ ) {
                let formattedData = this.formatData( teams[ iter ] );

                jsxTeams.push(
                    <div className="upcomingteam" key={ 'team#'+iter } >
                        <div className="type">{ teams[ iter ].type != null && teams[ iter ].type }</div>
                        <div className="time">{ formattedData.time != null && formattedData.time }</div>
                        <div className="price">{ formattedData.price != null && formattedData.price }</div>
                    </div>
                );

                jsxSelectTeams.push(
                    <div className="upcomingteam-container select" key={ 'selectteam#'+iter } >
                        <input type="radio" name="upcomingselect" id={ "upcomingselect#"+iter } />
                        <label className="upcomingteam select" htmlFor={ "upcomingselect#"+iter } >
                            <div className="type">{ teams[ iter ].type != null && teams[ iter ].type }</div>
                            <div className="time">{ formattedData.time != null && formattedData.time }</div>
                            <div className="price">{ formattedData.price != null && formattedData.price }</div>
                        </label>
                    </div>
                );

                if ( iter != teams.length-1 ) {
                    jsxTeams.push(
                        <div className="space" key={ "team-space#"+iter }>
                        </div>
                    );
                }
            }

            // Add placeholders
            if ( jsxTeams.length < 5 ) {
                for ( let n = 0; n <= 5 - jsxTeams.length; n ++ ) {

                    if ( n != ( 5 - jsxTeams.length ) ) {
                        jsxTeams.push(
                            <div className="space" key={ 'empty-team-space#'+(n) } >
                            </div>
                        );
                    }

                    jsxTeams.push(
                        <div className="upcomingteam" key={ 'empty-team#'+(n) } >
                            <div className="type empty"></div>
                            <div className="time empty"></div>
                            <div className="price empty"></div>
                        </div>
                    );

                }
            }

            // Sets state
            this.setState({ jsxTeams : jsxTeams, jsxSelectTeams : jsxSelectTeams });

        }
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        this.onresize();
        this.updateElems( nextProps.teams, nextProps.filter );
    }

    // Component will mount
    componentDidMount( ) {
        this.onresize();
        this.updateElems( this.props.teams, this.props.filter );
    }

    // Render
    render() {
        let jst = this.state.jsxSelectTeams;

        return (
            <div className={ this.props.select == true ? ( (this.props.select && jst != null && jst.length == 0) ? "upcomingteams select empty" : "upcomingteams select" ) : "upcomingteams" } >

                { this.props.select != true && this.state.jsxTeams != null && this.state.jsxTeams }
                { this.props.select && this.state.jsxSelectTeams != null &&
                    ( this.state.mobile ? this.state.jsxSelectTeams.slice(0,2) : this.state.jsxSelectTeams ) }

            </div>
        );
    }

    // Format Data
    formatData( data ) {

        let response = { },
            days = [ 'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag' ],
            months = [ 'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
                        'Juli', 'August', 'September', 'Oktober', 'November', 'December' ];

        // Formats date
        let day, month, date, hours, minutes;
        if ( data.timestamp != null ) {

            // Formats day, month, date & time
            day = days[ data.timestamp.getDay() ];
            month = months[ data.timestamp.getMonth() ];
            date = data.timestamp.getDate();
            hours = data.timestamp.getHours();
            minutes = data.timestamp.getMinutes();
            if ( minutes.toString().length < 2 ) minutes = '0'+minutes;

            // Plops it all together, into one BIIIG string:))
            response.time = day + ' ' + date + '. ' + month + ' kl. ' + hours + ':' + minutes;


        }

        // Formats price
        if ( data.price != null ) {

            let arr = data.price.toString().split('').reverse(),
                priceresponse = [], counter = 0;

            for ( let iter = 0; iter < arr.length; iter++ ) {
                if ( counter == 3 ) {
                    priceresponse.push( '.' );
                    counter = 0;
                }

                priceresponse.push( arr[iter] );
                counter++;
            }

            let finalPrice = priceresponse.reverse().join('');
            response.price = 'Pris ' + finalPrice + 'kr.';

        }


        return response;

    }

} module.exports = UpcomingTeams;
