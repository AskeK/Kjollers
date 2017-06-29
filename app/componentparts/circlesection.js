


// Circle section
const React = require( 'react' );
class CircleSection extends React.Component {

    // Constructor
    constructor() { super(); this.state = {}; }

    // Render
    render() {
        return (
            <a href={ ( this.props.link != null && this.props.link != '' ) ? this.props.link : '#' } className="circlesection" style={{ display : 'inline-block' }}>
                <div className="image" style={{ backgroundImage : 'url('+ this.props.img +')' }} >
                    <div className="overlay">
                        <div className="cursor">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-finger">
                                </use>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="title">
                    { this.props.title }
                </div>

                <div className="text">
                    { this.props.text }
                </div>
            </a>
        );
    }

} module.exports = CircleSection;
