


// Menu bar
const React = require( 'react' ),
      _ = require( '../libaries/underscore/underscore_main.js' ),
      globals = require( '../globals.js' );

class MenuBar extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            phone : '+45 11 22 33 44',
            mail : 'aske@smartmonkey.dk',
            jsxElems : null,
            menuelems : [ ],
        }

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
                <div key={ 'menuelem#'+iter } className={ elem.active ? 'menuelem active' : 'menuelem' } onClick={ this.handleClick.bind( this, elem.id, elem.pagetype, elem.dbid) } >
                    { elem.title }
                </div>
            );
        }

        if ( silent ) this.state.jsxElems = jsxElems;
        else this.setState({ jsxElems : jsxElems });
    }

    // Handle Click
    handleClick( id, pagetype, dbid ) {

        history.pushState( {

            slug : id.split('#').join(''),
            id : dbid,
            type : pagetype

        }, id.split('#').join(''), site_data.url + '/' + id.split('#').join('') );
        globals.changeView( id, true, pagetype, dbid );

    }

    // on scroll
    onScroll() {
        if ( window.innerWidth <= 720 && !_( this.props.parent + ' .menubar' ).hasClass('fixed') ) return;

        if ( _(this.props.parent).get(0).scrollTop >= _(this.props.parent+' .toparea').offset().top + _(this.props.parent+' .toparea').height() ) {
            _( this.props.parent + ' .menubar' ).addClass('fixed');
        } else {
            _( this.props.parent + ' .menubar' ).removeClass('fixed');
        }
    }

    // Render
    render() {
        return (
            <div className="menubar-container">
                <div className="menubar">
                    <div className="menubar-inner">
                        { this.state.jsxElems != null && this.state.jsxElems }
                        <a href={ globals.pagedatahandler.signuplink } data-id={ globals.pagedatahandler.signupid } data-slug={ globals.pagedatahandler.signupslug } data-type='signup' className="menuelem notification">Tilmeld dig et hold nu!</a>
                    </div>
                    <div className="style-bar" id="menubar-style-bar"></div>
                </div>
            </div>
        );
    }

    // Component did mount
    componentDidMount() {
        _(this.props.parent).on( 'scroll', this.onScroll.bind(this));
        let response = [], pages = globals.pagedatahandler.pages;

        if ( pages != null ) {
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
        }
    }

    // Component will mount
    componentWillMount() {
        this.updateJSXElems( false );
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        this.updateJSXElems( false );
    }

} module.exports = MenuBar;
