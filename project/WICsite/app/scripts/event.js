import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';
import style from '../css/style.css';

module.exports = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div>
                <div className={style.eventHeader}>
                    {this.props.name}
                </div>
                <div className={style.eventInfo}>
                    <div>
                        {this.props.date}, {this.props.time}
                    </div>
                    <div>
                        {this.props.location}
                    </div>
                    <div>
                        {this.props.description}
                    </div>
                    <div>
                        Cost: {this.props.cost}
                    </div>
                </div><Link to={'/events/' + this.props.id} className={style.buttonFormat}>Edit</Link>
            </div>
        );
    }
});
