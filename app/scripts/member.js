import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

module.exports = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div>
                <h2>
                    {this.props.name}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
		<Link to={'/members/' + this.props.id}>Edit</Link>
            </div>
        );
    }
});
