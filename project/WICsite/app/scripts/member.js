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
                <div className={style.contentHeader}>
                    {this.props.name}
                </div>
                <div className={style.contentInfo}>
                    <div>
                        {this.props.email}
                    </div>
                    <div>
                        {this.props.year}
                    </div>
                    <div>
                        {this.props.major}
                    </div>
                    <div>
                        {this.props.role}
                    </div>
                </div>
                <Link to={'/members/' + this.props.id} className={style.buttonFormat}>Edit</Link>
            </div>
        );
    }
});


     