


// Header
const React = require( 'react' ),
      HamburgerIcon = require( '../componentparts/hamburgericon.js' ),
      _ = require( '../libaries/underscore/underscore_main.js' ),
      globals = require( '../globals.js' );

class Header extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = { menuelems : null };

        globals.pagedatahandler.hooks.add( 'newpageloaded', () => {
            let response = [], pages = globals.pagedatahandler.pages;
            for ( let key in pages ) {
                if ( pages.hasOwnProperty(key) ) {
                    response.push({
                        id : '#'+pages[key].post_name,
                        pagetype : pages[key]['page-type'],
                        dbid : pages[key].ID,
                        title : pages[key].post_title,
                        active : false
                    });
                }
            }

            this.state.menuelems = response;
            this.updateJSXElems( false );
        });

    }

    // Bind actions
    bindActions() {
        _( '#general-overlay' ).on( 'click', () => {
            this.toggle();
        });
    }

    // Activate
    toggle() {
        if ( _('.topbar').hasClass('active') ) {
            _('.topbar').removeClass('active');
            _('.inner').removeClass('aside');
        } else {
            _('.topbar').addClass('active');
            _('.inner').addClass('aside');
        }
    }

    // Update jsx elems
    updateJSXElems( silent ) {
        if ( this.props.parent != null ) {
            for ( let iter = 0; iter < this.state.menuelems.length; iter++ ) {
                if ( this.state.menuelems[ iter ].id == this.props.parent ) {
                    this.state.menuelems[ iter ].active = true;
                } else {
                    this.state.menuelems[ iter ].active = false;
                }
            }
        }

        let jsxElems = [];
        for ( let iter = 0; iter < this.state.menuelems.length; iter++ ) {
            let elem = this.state.menuelems[ iter ];

            jsxElems.push(
                <a key={ 'navelem#'+iter } href={ site_data.url + '/' + elem.id.split('#').join('') } className={ elem.active ? 'navelem active' : 'navelem' } onClick={ (( e ) => { this.handleClick.call( this, e, elem.id, elem.pagetype, elem.dbid) }).bind(this) } >
                    { elem.title }
                </a>
            );
        }

        if ( silent ) this.state.jsxElems = jsxElems;
        else this.setState({ jsxElems : jsxElems });
    }

    // Handle Click
    handleClick( e, id, pagetype, dbid ) {

        e.preventDefault();
        this.toggle();

        history.pushState( {

            slug : id.split('#').join(''),
            id : dbid,
            type : pagetype

        }, id.split('#').join(''), site_data.url + '/' + id.split('#').join('') );
        globals.changeView( id, true, pagetype, dbid );

    }

    // Render
    render() {
        return (
            <header className="topbar">
                <div className="hamburger-container" onClick={ this.toggle.bind(this) }>
                    <HamburgerIcon classes="icon" />
                </div>

                <nav className="navigation">
                    <div className="close-icon" onClick={ this.toggle.bind(this) } >&times;</div>
                    <div className="nav-inner">
                        { this.state.jsxElems != null && this.state.jsxElems }
                    </div>
                </nav>

                <div className="notification">
                    <a href={ globals.pagedatahandler.signuplink } data-type='signup' data-id={ globals.pagedatahandler.signupid } data-slug={ globals.pagedatahandler.signupslug } className="btn">Tilmeld dig et hold nu!</a>
                </div>
            </header>
        );
    }

    // Component did mount
    componentDidMount() {
        this.bindActions();
    }

} module.exports = Header;
