


// Index
const React = require( 'react' ),
      _ = require( '../libaries/underscore/underscore_main.js' ),
      globals = require( '../globals.js' ),

      // Components
      Header = require( '../components/header.js' ),
      TopArea = require( '../components/toparea.js' ),
      MenuBar = require( '../components/menubar.js' ),
      HeroBanner = require( '../components/herobanner.js' ),
      CircleSections = require( '../components/circlesections.js' ),
      FriendDiscount = require( '../componentparts/frienddiscount.js' ),
      Article = require( '../components/article.js' ),
      Teams = require( '../components/teams.js' ),
      Footer = require( '../components/footer.js' );

class Page extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            article : null,
        };
    }

    // Get page content
    getPageContent() {

        globals.pagedatahandler.getPageContent( this.props.dbid ).then(((data) => {
            this.setState({ article : data });
        }).bind( this ));

    }

    // Remder
    render() {
        return (
            <div className="outer" id={ this.props.id != null ? this.props.id : 'noop' } >
                <div className="inner">

                    <Header />

                    <div className="container">

                        <TopArea collapsed={ !(this.state.type == 'frontpage') } />

                        <MenuBar parent={ '#'+(this.props.id != null ? this.props.id : 'noop') } />
                        <HeroBanner pages={ this.props.pages } src={ globals.pagedatahandler.pages[ this.props.id ].thumbnail_src }
                            frontpage={ this.state.stype == 'frontpage' } />

                        { this.state.type !== 'frontpage' && <div className="style-bar"></div> }
                        { this.state.type === 'frontpage' && <CircleSections sectiondata={ this.state.circlesectiondata } /> }

                        <div className="article">

                            { this.state.type === 'signup' && <SignupFields /> }
                            { this.state.article != null && <Article article={ this.state.article } /> }
                            { this.state.type !== 'signup' && <Teams /> }

                        </div>
                    </div>

                    <Footer signup={ !(this.state.type == 'signup') } />

                </div>
            </div>
        );
    }

    // Component did mount
    componentDidMount() {

        // ANCHORS!!! :))
        _('a[data-slug]').on('click', ( e, elem ) => {
            e.preventDefault();
            globals.changeView( '#'+elem.attr('data-slug'), true, elem.attr('data-type'), parseInt( elem.attr( 'data-id' ) ) );
        });

        this.getPageContent();
    }

} module.exports = Page;
