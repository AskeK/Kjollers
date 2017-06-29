


// Hamburger icon
const React = require( 'react' );
class HamburgerIcon extends React.Component {

    // Constructor
    constructor() { super(); }

    // Render
    render() {
        return (
            <div className={ this.props.classes != null ? this.props.classes + ' hamburger' : 'hamburger' } >
                <div className="hmline hmline1"></div>
                <div className="hmline hmline2"></div>
                <div className="hmline hmline3"></div>
            </div>
        );
    }

} module.exports = HamburgerIcon;
