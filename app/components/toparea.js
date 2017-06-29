


// Top area
const React = require( 'react' ),
      globals = require( '../globals.js' );

class TopArea extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {

            // tmp
            backImg : 'http://kjollers-koreskole.dk/customerdata/files/templates/1/cream-pixels.png',
            logo : 'http://kjollers-koreskole.dk/CustomerData/Files/Images/Archive/1-grafikfiler/logo_3.png',
            phone : '',
            mail : ''

        };

        // Gets phone number and mail
        globals.optionsdatahandler.Get( 'phone,mail,address,cvr' ).then((( data ) => {
            this.setState({ phone : data.phone, mail : data.mail });
        }).bind(this));

    }

    // Render
    render() {
        return (
            <div className="toparea-container">
                <div className="contact-icons">
                    <div className="contact-icons-inner">
                        <a href={ 'tel:'+ ( this.state.phone.split(' ').join('') ) } className="contact-phone contact-icon">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-phone"></use>
                            </svg>
                            <div className="title">
                                { this.state.phone }
                            </div>
                        </a>
                        <a href={ 'mailto:'+this.state.mail } className="contact-mail contact-icon">
                            <div className="title">
                                { this.state.mail }
                            </div>
                            <svg viewBox="0 0 20 20">
                                <use xlinkHref="#icon-mail"></use>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="toparea" style={{ backgroundImage : 'url(' + this.state.backImg + ')' }}>
                    {/*<div className="style-bar" id="top-style-bar"></div>*/}
                    <div className="toparea-inner">
                        <div className="logo" style={{ backgroundImage : 'url(' + this.state.logo + ')' }} >
                        </div>
                    </div>
                </div>
            </div>
        );
    }

} module.exports = TopArea;
