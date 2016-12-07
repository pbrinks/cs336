import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Event from './event';

module.exports = React.createClass({
    render: function() {
        var eventNodes = this.props.data.map(function(event) {
            return (
                <Event id={event.id} name={event.name} key={event.id}>
                    {event.date}
                    {event.time}
                    {event.description}
                    {event.location}
                    {event.cost}
                </Event>
            );
        });
        return (
            <div className="EventList">
                {eventNodes}
            </div>
        );
    }
});
