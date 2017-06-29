


// Hero Banner
const React = require( 'react' ),
      globals = require( '../globals.js' );

class HeroBanner extends React.Component{

    // Constructor
    constructor() {
        super();
        this.state = {
            img : 'http://kjollers-koreskole.dk/customerdata/files/templates/1/bg-banner.jpg',
        };
    }

    // Render
    render() {
        return (
            <div className={ this.props.frontpage == true ? 'herobanner-container hc-frontpage' : "herobanner-container"}>
                <div className={ !this.props.frontpage ? 'herobanner subbanner' : 'herobanner' } style={{ backgroundImage : 'url(' + ( this.props.src ? this.props.src : this.state.img ) + ')' }} >
                    <div className="overlay"></div>

                   { this.props.frontpage &&

                        <div className="circle">
                            <div className="title">Tilmeld dig nu!</div>
                            <div className="text">Kjøllers Køreskole ligger tæt på Svendborg Gymnasium - derfor vælger de fleste Kjøllers Køreskole</div>
                            <a href={ globals.pagedatahandler.signuplink } data-id={ globals.pagedatahandler.signupid } data-slug={ globals.pagedatahandler.signupslug } className="anim-btn btn">
                                Bliv tilmeldt
                            </a>
                        </div>

                    }

                </div>
            </div>
        );
    }

} module.exports = HeroBanner;
