


// Article
const React = require( 'react' ),
      globals = require( '../globals.js' ),
      _ = require( '../libaries/underscore/underscore_main.js' ),
      Header = require( '../components/header.js' ),
      TopArea = require( '../components/toparea.js' ),
      MenuBar = require( '../components/menubar.js' ),
      HeroBanner = require( '../components/herobanner.js' ),
      ArticleComponent = require( '../components/article.js' ),
      Teams = require( '../components/teams.js' ),
      Footer = require( '../components/footer.js' );

class Article extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            article : null,
        };
    }

    // Get content
    getContent() {
        globals.pagedatahandler.getPageContent( this.props.dbid ).then(( data ) => {
            this.setState({ article : data })
        });
    }

    // Render
    render() {
        return (
            <div className="outer" id={ this.props.id != null ? this.props.id : 'noop' } >
                <div className="inner">
                    <Header />
                    <div className="container">
                        <TopArea />
                        <MenuBar parent={ '#'+(this.props.id != null ? this.props.id : 'noop') } />
                        <HeroBanner pages={ this.props.pages } src={ globals.pagedatahandler.pages[ this.props.id ].thumbnail_src } />
                        <div className="style-bar"></div>

                        <div className="article">
                            { this.state.article != null && <ArticleComponent article={ this.state.article } /> }
                            <Teams />
                        </div>
                    </div>
                    <Footer />
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

        this.getContent();

    }

} module.exports = Article;
