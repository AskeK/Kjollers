

// Signup form
const React = require( 'react' ),
      _ = require( '../libaries/underscore/underscore_main.js' ),
      globals = require( '../globals.js' ),
      UpcomingTeams = require( '../componentparts/upcomingteams.js' );

class SignupForm extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            teamsfilter : { id : '' },
            signedin : ( window._cookielib.read( 'signedup' ) === 'true' ),
            mobile : false,
        };

        this.rest_api = site_data.rest_api;

    }

    // Submit signup
    submitSignup( ) {

        if ( _('.field input.wrong') !== false ) _('.field input.wrong').removeClass('wrong');

        let name = _('#signup-form-name').get(0).value,
            lname = _('#signup-form-lname').get(0).value,
            birthday = _('#signup-form-birth').get(0).value,
            phone = _('#signup-form-phone').get(0).value,
            mail = _('#signup-form-mail').get(0).value,
            address = _('#signup-form-address').get(0).value,
            category = _('input[name=signupform-category]:checked');

        let wrong = false;
        if ( !( this.checkName( true ))) wrong = true;
        if ( !( this.checkLName( true ))) wrong = true;
        if ( !( this.checkBirth( true ))) wrong = true;
        if ( !( this.checkPhone( true ))) wrong = true;
        if ( !( this.checkMail( true ))) wrong = true;
        if ( !( this.checkAddress( true ) ) ) wrong = true;
        if ( !( this.checkCategory( true ))) wrong = true;

        if ( wrong ) return;
        _('.signup-fields').addClass('loading');
        category = category.get(0).value;

        let request = new XMLHttpRequest();
        request.onload = (() => {

            _('.signup-fields').removeClass('loading');
            _('.signup-fields').addClass('processed');

            setTimeout(() => {
                _('.signup-fields').addClass('done');
            }, 900);

            window._cookielib.set( 'signedup', 'true', 60 )

        });

        request.open( 'POST', this.rest_api+'signups' );
        request.setRequestHeader("Content-type", "application/json");
        request.send( JSON.stringify({

            name : name,
            lname : lname,
            birthday : birthday,
            phone : phone,
            mail : mail,
            address : address,
            category : category

        }));

    }

    // Handle category click
    handleCategoryClick( type ) {

        if ( _( '#signup-teams' ).hasClass('notactive') ) {

            if ( this.state.teamsfilter.id != null && this.state.teamsfilter.id !== type ) {
                this.setState({ teamsfilter : { id : type } }, () => {
                    if ( !_('#signup-teams .upcomingteams').hasClass('empty') ) {
                        _( '#signup-teams' ).removeClass('notactive');
                    }
                });
            }

        } else {

            if ( this.state.teamsfilter.id != null && this.state.teamsfilter.id !== type ) {
                _( '#signup-teams' ).addClass('notactive');
                setTimeout(() => {
                    this.setState({ teamsfilter : { id : type } }, () => {
                        if ( !_('#signup-teams .upcomingteams').hasClass('empty') ) {
                            _( '#signup-teams' ).removeClass('notactive');
                        }
                    });
                }, 300);
            }

        }

    }

    // Bind ui actions
    bindUIActions() {
        _('.signup-fields input').each(( item ) => {

            // Fields
            let parent = item.parent();

            // Focus in
            item.on( 'focusin', (( item, parent ) => {
                parent.addClass( 'active' );
            }).bind( this, item, parent ));

            // Focus out
            item.on( 'focusout', (( item, parent ) => {
                if ( item.get(0).value.length < 1 ) {
                    parent.removeClass('active'); }
            }).bind( this, item, parent ));

        });
    }

    // Resignup
    resignup() {
        this.setState({ signedin : false });
    }

    // Render
    render() {
        return (
            <div className={ this.state.signedin ? "signup-fields done" : "signup-fields" } >
                <div className="sub-inner">

                    <div className="main-title">Tilmeld dig her:</div>

                    <div className="signup-inner">

                        <div className="fields fields-left">

                            <div className="field" id="signup-name" >
                                <div className="text">Fornavn: *</div>
                                <input type="text" id="signup-form-name" onKeyDown={ this.checkName.bind(this, false) } />
                                <div className="declined">&times;</div>
                            </div>

                            <div className="field" id="signup-lname" >
                                <div className="text">Efternavn: *</div>
                                <input type="text" id="signup-form-lname" onKeyDown={ this.checkName.bind(this, false) } />
                                <div className="declined">&times;</div>
                            </div>

                            <div className="field" id="signup-birth" >
                                <div className="text">Fødselsdato ( dd-mm-yyyy ): *</div>
                                <input type="text" id="signup-form-birth" onKeyDown={ this.checkBirth.bind(this, false) } />
                                <div className="declined">&times;</div>
                            </div>

                            <div className="field" id="signup-phone" >
                                <div className="text">Telefon: *</div>
                                <input type="text" id="signup-form-phone" onKeyDown={ this.checkPhone.bind(this, false) } />
                                <div className="declined">&times;</div>
                            </div>

                            <div className="field" id="signup-mail" >
                                <div className="text">Email: *</div>
                                <input type="text" id="signup-form-mail" onKeyDown={ this.checkMail.bind(this, false) } />
                                <div className="declined">&times;</div>
                            </div>

                            <div className="field" id="signup-address" >
                                <div className="text">Adresse: *</div>
                                <input type="text" id="signup-form-address" onKeyDown={ this.checkAddress.bind(this, false) } />
                                <div className="declined">&times;</div>
                            </div>

                            {/*<div className="field" id="signup-message" data-required={ 1 } >
                                <div className="text">Besked:</div>
                                <input type="text" id="signup-form-message" />
                            </div>*/}

                        </div>

                        <div className="fields fields-right">

                            <div className="field" id="cats" onClick={ this.checkCategory.bind(this) } >
                                <div className="text">Kategori: *</div>
                                <div className="selector-container">

                                    <div className="field">
                                        <input type="radio" name="signupform-category" value="car" id="car" data-ident="car" />
                                        <label htmlFor="car" onClick={ this.handleCategoryClick.bind(this, 'car') }></label>
                                        <div className="text">Bil</div>
                                    </div>

                                    <div className="field">
                                        <input type="radio" name="signupform-category" value="rec" id="recovery" data-ident="recovery" />
                                        <label htmlFor="recovery" onClick={ this.handleCategoryClick.bind(this, 'rec') }></label>
                                        <div className="text">Generhvervelse</div>
                                    </div>

                                    <div className="field">
                                        <input type="radio" name="signupform-category" value="test" id="controlledtest" />
                                        <label htmlFor="controlledtest" onClick={ this.handleCategoryClick.bind(this, 'test') }></label>
                                        <div className="text">Kontrollerende prøve</div>
                                    </div>

                                    <div className="field">
                                        <input type="radio" name="signupform-category" value="ban" id="drivingban" />
                                        <label htmlFor="drivingban" onClick={ this.handleCategoryClick.bind(this, 'ban') }></label>
                                        <div className="text">Kørselsforbud</div>
                                    </div>

                                   <div className="field">
                                        <input type="radio" name="signupform-category" value="cpr" id="cpr" />
                                        <label htmlFor="cpr" onClick={ this.handleCategoryClick.bind(this, 'cpr') }></label>
                                        <div className="text">Førstehjælp</div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="fields fields-bottom">
                            <div className="field notactive" id="signup-teams">
                                <div className="text">Ønsket startdato:</div>
                                <div className="selector-container">
                                    <UpcomingTeams filter={ this.state.teamsfilter } select={ true } teams={ globals.teamsdatahandler.teams } />
                                </div>
                            </div>
                        </div>

                        <div className="send" onClick={ this.submitSignup.bind(this) } >
                            Tilmeld dig
                            <svg viewBox="0 0 28 28">
                                <use xlinkHref="#icon-send">
                                </use>
                            </svg>
                        </div>

                    </div>
                </div>

                <div className="sent">
                    Tilmelding er sendt
                    <div className="onemoretime" onClick={ this.resignup.bind(this) } >
                        Send en ekstra tilmelding?
                    </div>
                </div>
            </div>
        );
    }

    // Component did mount
    componentDidMount() {
        this.bindUIActions();
    }

    // Check name
    checkName( wrongable ) {
        if ( _('#signup-form-name') !== false ) {
            let name = _('#signup-form-name').get(0).value;

            if ( !wrongable ) {
                setTimeout(() => {
                    let name = _('#signup-form-name').get(0).value;
                    if ( name.length >= 2 ) {
                        _('#signup-form-name').removeClass('wrong');
                        return true;
                    }
                }, 200);
            } else {

                if ( name.length >= 2 ) {
                    _('#signup-form-name').removeClass('wrong');
                    return true;
                }

                if ( wrongable ) {
                    _('#signup-form-name').addClass('wrong');
                    return false;
                }

            }

        } return true;
    }

    // Check name
    checkLName( wrongable ) {
        if ( _('#signup-form-lname') !== false ) {
            let name = _('#signup-form-lname').get(0).value;

            if ( !wrongable ) {
                setTimeout(() => {
                    let name = _('#signup-form-lname').get(0).value;
                    if ( name.length >= 2 ) {
                        _('#signup-form-lname').removeClass('wrong');
                        return true;
                    }
                }, 200);
            } else {

                if ( name.length >= 2 ) {
                    _('#signup-form-lname').removeClass('wrong');
                    return true;
                }

                if ( wrongable ) {
                    _('#signup-form-lname').addClass('wrong');
                    return false;
                }

            }

        } return true;
    }

    // Check Birth day
    checkBirth( wrongable ) {
        if ( _('#signup-form-birth') !== false ) {
            let birth = _('#signup-form-birth').get(0).value;

            if ( !wrongable ) {
                setTimeout(() => {
                    let birth = _('#signup-form-birth').get(0).value;
                    if ( birth.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/) ) {
                        _('#signup-form-birth').removeClass('wrong');
                        return true;
                    }
                }, 200);
            } else {

                if ( birth.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/) ) {
                    _('#signup-form-birth').removeClass('wrong');
                    return true;
                }

                if ( wrongable ) {
                    _('#signup-form-birth').addClass('wrong');
                    return false;
                }

            }

        } return true;
    }

    // Check Phone
    checkPhone( wrongable ) {
        if ( _('#signup-form-phone') !== false ) {

            let phone = _('#signup-form-phone').get(0).value;
            if ( !wrongable ) {
                setTimeout(() => {
                    if ( phone.match(/^((\(?\+45\)?)?)(\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/) ) {

                        _('#signup-form-phone').removeClass('wrong');
                        return true;

                    }
                }, 200);
            } else {
                if ( phone.match(/^((\(?\+45\)?)?)(\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/) ) {
                    _('#signup-form-phone').removeClass('wrong');
                    return true;
                }

                if ( wrongable ) {
                    _('#signup-form-phone').addClass('wrong');
                    return false;
                }

            }

        } return true;
    }

    // Check mail
    checkMail( wrongable ) {
        if ( _('#signup-form-mail') !== false ) {
            let mail = _('#signup-form-mail').get(0).value;

            if ( !wrongable ) {
                setTimeout(() => {
                    if ( mail.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) ) {

                        _('#signup-form-mail').removeClass('wrong');
                        return true;

                    }
                }, 200);
            } else {

                if ( mail.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) ) {

                    _('#signup-form-mail').removeClass('wrong');
                    return true;

                }

                if ( wrongable ) {
                    _('#signup-form-mail').addClass('wrong');
                    return false;
                }

            }

        } return true;
    }

    // Check address
    checkAddress( wrongable ) {
        if ( _('#signup-form-address') !== false ) {
            let address = _('#signup-form-address').get(0).value;

            if ( !wrongable ) {
                setTimeout(() => {
                    if ( address.length > 6 ) {
                        _('#signup-form-address').removeClass('wrong');
                        return true;
                    }
                }, 200);
            } else {

                if ( address.length > 6 ) {
                    _('#signup-form-address').removeClass('wrong');
                    return true;
                }

                if ( wrongable ) {
                    _('#signup-form-address').addClass('wrong');
                    return false;
                }

            }

        } return true;
    }

    // Check category
    checkCategory( wrongable ) {

        if ( _('input[name=signupform-category]:checked') !== false ) {
            _('.field#cats').removeClass('wrong');
            return true;
        }

        if ( wrongable ) {
            _('.field#cats').addClass('wrong');
            return false;
        }

    }

} module.exports = SignupForm;





