

// Cookie OK
const React = require( 'react' ),
      _ = require( '../libaries/underscore/underscore_main.js' );

class CookieOK extends React.Component{

    // Constructor
    constructor() {
        super();
        this.state = {
            oke : ( window._cookielib.read('cookieok') === 'true' )
        };
    }

    // Oke
    oke() {
        window._cookielib.set( 'cookieok', 'true', 60 );
        this.setState({ oke : true });
    }

    // Render
    render( ) {
        return (
            <div className={ this.state.oke ? "cookieok oke" : "cookieok" } >
                <div className="text">Denne side bruger cookies, oke?
                    <div className="ok" onClick={ this.oke.bind(this) } >
                        <svg viewBox="0 0 24 32">
                            <use xlinkHref="#icon-ok"></use>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

} module.exports = CookieOK;
