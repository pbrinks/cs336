/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * member.js displays and formats information for a specific member */
 
import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';
import style from '../css/style.css';

module.exports = React.createClass({
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
                        {this.props.year}, {this.props.major}
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


     