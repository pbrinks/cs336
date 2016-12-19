/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * eventList.js renders a list of events *
 */
 
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Event from './event';

module.exports = React.createClass({
    render: function() {
        var eventNodes = this.props.data.map(function(event) {
            return (
                <Event id={event.id} name={event.name} date={event.date} time={event.time} description={event.description} 
                        location={event.location} cost={event.cost} key={event.id}></Event>
            );
        });
        return (
            <div>
                {eventNodes}
            </div>
        );
    }
});
