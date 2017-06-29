


// Controller
const React = require( 'react' ),

      // Data Handlers
      PageDataHandler = require( './datahandlers/pageHandler.js' ),
      TeamsDataHandler = require( './datahandlers/teamsHandler.js' ),
      OptionsDataHandler = require( './datahandlers/optionsHandler.js' ),

      // Pages
      IndexPage = require( './pages/index.js' ),
      ArticlePage = require( './pages/article.js' ),
      SignupPage = require( './pages/signupform.js' ),

      // Etc
      _ = require( './libaries/underscore/underscore_main.js' ),
      globals = require( './globals.js' ),
      CookieOK = require( './components/cookieok.js' );

class Controller extends React.Component {

    // Constructor
    constructor() {

        // Std
        super();
        this.state = {
            currentView : null,
            pages : [],
        };

        // Change view related
        globals.setMainState = this.setState.bind( this );
        globals.changeView = this.changeView.bind( this );
        window.onpopstate = (( e ) => {
            console.log( e );

            if( e.state == null ) {

                if ( site_data.type !== '404' ) {

                    globals.pagedatahandler.getPageContent( site_data.id ).then((() => {

                        if ( site_data.page_type === 'frontpage' ) {

                            this.setState({
                                pages : [ <IndexPage key={ site_data.slug } id={ site_data.slug } dbid={ parseInt( site_data.id ) } /> ]
                            }); this.changeView( '#'+site_data.slug, true );

                        } else {
                            this.changeView( '#'+site_data.slug, true, site_data.page_type, site_data.id );
                        }

                    }).bind(this));

                } else return; // :))

            } else {
                this.changeView( '#'+e.state.slug, true, e.state.type, e.state.id );
            }
        });

        // Teams data handler
        globals.teamsdatahandler = new TeamsDataHandler();

        // Options Data Handler
        globals.optionsdatahandler = new OptionsDataHandler();

        // Page Data Handler
        globals.pagedatahandler = new PageDataHandler();
        globals.pagedatahandler.initPageLoad().then((() => {

            if ( site_data.type !== '404' ) {

                globals.pagedatahandler.getPageContent( site_data.id ).then((() => {

                    // Replaces state
                    history.replaceState( {

                        slug : site_data.slug,
                        id : site_data.id,
                        type : site_data.type

                    }, site_data.slug, site_data.current_url );

                    // Loads page
                    if ( site_data.page_type === 'frontpage' ) {

                        this.setState({
                            pages : [ <IndexPage key={ site_data.slug } id={ site_data.slug } dbid={ parseInt( site_data.id ) } /> ]
                        }); this.changeView( '#'+site_data.slug, true );

                    } else {
                        this.changeView( '#'+site_data.slug, true, site_data.page_type, site_data.id );
                    }

                }).bind(this));

            } else return; // :))

        }).bind(this));



    }

    // Change view
    changeView( view, notrans, type, dbid ) {

        let _changeView = (( view, notrans ) => {

            if ( this.state.currentView != null && this.state.currentView !== ''  ) {
                if ( _( this.state.currentView ) !== false )
                    _( this.state.currentView ).addClass('notrans').css({ left: '-100%' }).get(0).offsetHeight;

                _( this.state.currentView + ' .menubar' ).removeClass('fixed');
            }

            if ( view != null && _( view ) !== false && _(view) != null ) {
                _( view ).addClass('notrans').css({ left: '0' }).get(0).offsetHeight;
                _( view ).get(0).scrollTop = 0;
                _( view + ' .menubar' ).removeClass( 'fixed' );
            }

            if ( this.state.currentView != null && this.state.currentView !== '' ) _( this.state.currentView ).removeClass('notrans');
            if ( view != null && view !== '' ) _( view ).removeClass('notrans');

            this.state.currentView = view;

        });

        if ( notrans ) {
            if ( !_( view ) ) {
                if ( type === 'frontpage' ) {

                    this.state.pages.push( <IndexPage key={ globals.pagedatahandler.frontpage.post_name } id={ globals.pagedatahandler.frontpage.post_name } dbid={ globals.pagedatahandler.frontpage.ID } /> );

                } else if ( type === 'article' ) {

                    this.state.pages.push( <ArticlePage key={ view.split('#').join('') } id={ view.split('#').join('') } dbid={ dbid } /> );

                } else if ( type === 'signup' ) {

                    this.state.pages.push( <SignupPage key={ view.split('#').join('') } id={ view.split('#').join('') } dbid={ dbid } /> );

                } else return;

                this.setState({ pages : this.state.pages }, () => {
                    _changeView.call( this, view, notrans );
                }); return;
            }

            _changeView.call( this, view, notrans );
            return;

        }

    }

    // Render
    render() {
        return (
            <div className="site">
                <CookieOK />
                { this.state.pages != null && this.state.pages }
            </div>
        );
    }

} module.exports = Controller;
