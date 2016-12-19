/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * event.js displays and formats information for a specific event */
 
import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';
import style from '../css/style.css';

module.exports = React.createClass({
    render: function() {
        var monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"];
        var cts = (this.props.date),
        cmonth = (new Date(cts)).getMonth(),
        cday = (new Date(cts)).getDate() + 1;
        var month = monthNames[cmonth];
        if (month =="January" || month == "March" || month == "May" || month == "July" || month == "August" || month == "October" || month == "December") {
            if (cday > 31) {
                cday = 1;
            }
        } else if (month =="April" || month =="June" || month =="September" || month =="November") {
            if (cday > 30) {
                cday = 1;
            }
        } else if ( month == "February") {
            if (cday > 28) {
                cday = 1;
            }
        }
        return (
            <div>
                <div className={style.contentHeader}>
                    {this.props.name}
                </div>
                <div className={style.contentInfo}>
                    <div>
                        {month} {cday}, {this.props.time}
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