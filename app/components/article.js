


// Article
const React = require( 'react' );
class Article extends React.Component {

    // Constructor
    constructor() { super(); this.state = {}; }

    // Render
    render() {
        return (
            <div className="article-inner" dangerouslySetInnerHTML={{ __html: (this.props.article != null ? this.props.article : '<div></div>') }} >
            </div>
        );
    }

} module.exports = Article;
