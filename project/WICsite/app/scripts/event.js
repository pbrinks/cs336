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
        // display event dates in month name day format
        var monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"];
        var cts = (this.props.date);
        var cmonth = (new Date(cts)).getUTCMonth();
        var cday = (new Date(cts)).getDate() + 1;   // date is zero indexed
        var month = monthNames[cmonth];
        // if date exceds month day limit
        if (month =="January" || month == "March" || month == "May" || month == "July" || month == "August" 
                || month == "October" || month == "December") {
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
        // return event info
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