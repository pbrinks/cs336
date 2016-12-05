import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Event from './event';

module.exports = React.createClass({
    render: function() {
        var eventNodes = this.props.data.map(function(event) {
            return (
                <Event id={event.id} author={event.author} key={event.id}>
                    {event.text}
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
