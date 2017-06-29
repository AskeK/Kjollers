


// Page Data Handler
const HookHandler = require( '../libaries/underscore/underscore_hookhandler.js' );
class PageDataHandler {

    // Constructor
    constructor() {

        this.rest_api = site_data.rest_api;
        this.pages = { };
        this.hooks = new HookHandler();
        this.frontpage = null;

        this.signuplink = null;
        this.signupslug = null;
        this.signupid = null;

    }

    // initial page load
    initPageLoad() {
        return new Promise(( resolve, reject ) => {

            let request = new XMLHttpRequest();
            request.onload = (( data ) => {

                let json = JSON.parse( data.target.response );
                console.log( json );

                for ( let elem of json ) {
                    if ( elem['page-type'] == 'frontpage' ) this.frontpage = elem;
                    if ( elem['page-type'] == 'signup' ) {

                        this.signuplink = site_data.url + '/' + elem['post_name'];
                        this.signupslug = elem['post_name'];
                        this.signupid = elem['ID'];

                    }

                    this.pages[ elem.post_name ] = elem;
                }

                this.hooks.trigger( 'initpageload' );
                this.hooks.trigger( 'newpageloaded' );
                resolve( this.pages );

            });

            request.open( 'GET', this.rest_api+'pages' );
            request.send();

        });
    }

    // Get frontpage
    getPageContent( id ) {

        return new Promise(( resolve, reject ) => {

            let request = new XMLHttpRequest();
            request.onload = (( data ) => {

                let json = JSON.parse( data.target.response );
                for ( let elem in this.pages ) {
                    if ( this.pages.hasOwnProperty(elem) ) {
                        this.pages[ elem ].content = json.content;
                    }
                }

                this.hooks.trigger( 'newpageloaded' );
                resolve( this.nl2p( json.post_content ) );

            });

            request.open( 'GET', this.rest_api+'page/'+id+'?fields=post_content' );
            request.send();

        });

    }

    // New line to paragraph
    nl2p( text ) {
        let paras = text.split( /[\r\n]+/g ), resp = [];
        for ( let iter = 0; iter < paras.length; iter++ ) {
            resp.push( '<p>' + paras[iter] + '</p>' );
        } return resp.join('');
    }

} module.exports = PageDataHandler;
