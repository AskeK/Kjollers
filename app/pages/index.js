


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

class IndexPage extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            article : null,
            circlesectiondata : [
                { imgsrc: 'https://static.pexels.com/photos/13861/IMG_3496bfree.jpg', title: 'KØREKORT TIL BIL', text: 'Hos mig kommer du til at køre i en helt ny og lækker Golf R line' },
                { imgsrc: 'https://static.pexels.com/photos/13861/IMG_3496bfree.jpg', title: 'Kørekort som 17 årig', text: '3 måneder før du fylder 17 år, kan du nu starte til teori' },
                { imgsrc: 'https://static.pexels.com/photos/13861/IMG_3496bfree.jpg', title: 'GENERHVERVELSE', text: 'Hos os tilbyder vi generhvervelse af kørekort samt hjælp til kontrollerende køreprøver' }
            ],
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

                        <TopArea />

                        <MenuBar parent={ '#'+(this.props.id != null ? this.props.id : 'noop') } />

                        <HeroBanner pages={ this.props.pages } src={ globals.pagedatahandler.pages[ this.props.id ].thumbnail_src } frontpage={ true } />

                        <CircleSections sectiondata={ this.state.circlesectiondata } />

                        <div className="article">

                            { this.state.article != null && <Article article={ this.state.article } /> }
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

        this.getPageContent();
    }

} module.exports = IndexPage;
