


// Circle Sections
const React = require( 'react' ),
      globals = require( '../globals.js' ),
      _ = require( '../libaries/underscore/underscore_main.js' ),
      RailBar = require( '../componentparts/railbar.js' ),
      CircleSection = require( '../componentparts/circlesection.js' );

class CircleSections extends React.Component {

    // Constructor
    constructor() {

        super();
        this.state = {
            mobile : window.innerWidth <= 910,
        };

        // Mobile
        _(window).on('resize', () => {
            if ( window.innerWidth <= 910 ) {
                if ( !this.state.mobile ) this.setState({ mobile : true })
            } else {
                if ( this.state.mobile ) this.setState({ mobile : false });
            }
        });

        // FP Bubbles
        globals.optionsdatahandler.Get('frontpage_bubbles').then(( data ) => {
            console.log( data );
            this.setState({ bubbles : data.frontpage_bubbles });
        });

    }

    // Update sections
    updateSections( props, silent ) {
        if ( this.state.bubbles != null ) {

            let jsxSections = [];
            for ( let n = 0; n < this.state.bubbles.length; n ++ ) {

                let elem = this.state.bubbles[ n ];
                jsxSections.push( <CircleSection title={ elem.bubble_headline }
                            text={ elem.bubble_text } link={ elem.bubble_link }
                            img={ elem.bubble_img } key={ 'circlesection#' + n } /> );

            }

            if ( !silent ) this.setState({ jsxSections : jsxSections });
            else this.state.jsxSections = jsxSections;

        }
    }

    // Render
    render() {
        return (
            <div className="circlesections-container">
                <div className="circlesections">
                    <div className="circlesections-inner">
                        { this.state.jsxSections != null && this.state.mobile &&
                            <RailBar name="circle-sections" snap='left' buttons={ true } sizes={{ 0 : 1, 600 : 2 }} >
                                { this.state.jsxSections }
                            </RailBar>
                        }

                        { this.state.jsxSections != null && !this.state.mobile &&
                            this.state.jsxSections
                        }
                    </div>
                </div>
                <div className="style-bar"></div>
            </div>
        );
    }

    // Component did mount
    componentWillMount() {
        this.updateSections( this.props, false );
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        this.updateSections( nextProps, false );
    }

} module.exports = CircleSections;
