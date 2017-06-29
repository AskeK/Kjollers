


// Footer
const React = require( 'react' ),
      _ = require( '../libaries/underscore/underscore_main.js' ),
      globals = require( '../globals.js' );

class Footer extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            mobile : window.innerWidth <= 690,
        };


        // Gets phone number, mail, cvr & address
        globals.optionsdatahandler.Get( 'phone,mail,address,cvr' ).then((( data ) => {
            this.setState({ phone : data.phone, mail : data.mail, address : data.address, cvr : data.cvr });
        }).bind(this));

        _( window ).on( 'resize', () => {
            if ( window.innerWidth <= 690 && !this.state.mobile ) {
                this.setState({ mobile : true });
            } else if ( window.innerWidth > 690 && this.state.mobile ) {
                this.setState({ mobile : false });
           }
        });
    }

    // Render
    render() {
        return (
            <footer className="footer" >
                { /* Muhaha.. Ha.. Just die */ }
                { !(!(!(!(!(!(!( this.props.signup == false ))))))) &&
                    <div className="signup-container">
                        <div className="signup">

                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-cone">
                                    </use>
                                </svg>
                            </div>

                            <div className="info-container">
                                <div className="title">TILMELD DIG ET TEORIHOLD</div>
                                <div className="text">
                                    Vi bruger tavleundervisning - en god måde hvor vi gennemgår teorien sammen, i nogle hyggelige timer en gang om ugen
                                </div>
                                <a className="btn" href={ globals.pagedatahandler.signuplink } data-type='signup' data-id={ globals.pagedatahandler.signupid } data-slug={ globals.pagedatahandler.signupslug } >
                                    Tilmeld dig her
                                </a>
                            </div>

                        </div>
                    </div>
                }

                {<div className="info">
                    <div className="info-inner">

                        { !this.state.mobile &&
                            <div>
                            <div className="info-elem about">
                                <div className="icon">
                                    <svg viewBox="0 0 32 32">
                                        <use xlinkHref="#icon-home"></use>
                                    </svg>
                                </div>

                                <div className="title">Om køreskolen</div>
                                <div className="content">
                                    <div className="name">Kjøllers Køreskole</div>
                                    <div className="cvr">CVR: { this.state.cvr != null && this.state.cvr }</div>
                                </div>
                            </div>

                            <div className="info-elem adress">
                                <div className="icon">
                                    <svg viewBox="0 0 32 32">
                                        <use xlinkHref="#icon-location"></use>
                                    </svg>
                                </div>

                                <div className="title">Vores adresse</div>
                                <div className="content">
                                    <div className="address">{ this.state.address != null && this.state.address }</div>
                                    <div className="link"><a href="#">Se kort her</a></div>
                                </div>
                            </div>

                            <div className="info-elem contact">
                                <div className="icon">
                                    <svg viewBox="0 0 32 32">
                                        <use xlinkHref="#icon-phone"></use>
                                    </svg>
                                </div>

                                <div className="title">Kontakt os</div>
                                <div className="content">
                                    <div className="phone">Tlf.: <a href="tel://+4525389698">{ this.state.phone != null && this.state.phone }</a></div>
                                    <div className="mail">Mail: <a href="mailto:aske@smartmonkey.dk">{ this.state.mail != null && this.state.mail }</a></div>
                                </div>
                            </div>
                            </div>
                        }

                        { this.state.mobile &&
                            <div className="info-elem about">
                                <div className="icon">
                                    <svg viewBox="0 0 32 32">
                                        <use xlinkHref="#icon-home"></use>
                                    </svg>
                                </div>

                                <div className="title">Om køreskolen</div>
                                <div className="content">
                                    <div className="name">Kjøllers Køreskole</div>
                                    <div className="address">Skovsbovej 2, 5700 Svendborg</div>
                                    <div className="phone">Tlf.: <a href="tel://+4525389698">+45 11 22 33 44</a></div>
                                    <div className="mail">Mail: <a href="mailto:aske@smartmonkey.dk">aske@smartmonkey.dk</a></div>
                                    <div className="cvr">CVR: 34853916</div>
                                </div>
                            </div>
                        }

                    </div>
                </div>}
                <a className="signature" href="http://smartmonkey.dk/" >
                    <div className="signature-inner">
                        <svg viewBox="0 0 22 28">
                            <use xlinkHref="#icon-spy"></use>
                        </svg>

                        <span className="text">Made by Aske K., SmartMonkey - 2017</span>
                    </div>
                </a>
            </footer>
        );
    }

} module.exports = Footer;
