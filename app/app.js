
// Fields
const ReactDOM = require( 'react-dom' ),
      React = require( 'react' ),
      _ = require( './libaries/underscore/underscore_main.js' ),

      // Pages
      Controller = require( './controller.js' );

require( '../css/index.scss' );

// On ready
window.addEventListener( 'load', (( e ) => {
    let root = _('#root').get(0);
    ReactDOM.render( <Controller />, root );
}));
