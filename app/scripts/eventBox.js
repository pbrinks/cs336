/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * eventBox.js diplays the list of events along with a form to add a new event */
 
import React from 'react';
import $ from 'jquery';
import EventList from './eventList';
import EventForm from './eventForm';
import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadeventsFromServer: function() {
        $.ajax({
            url: API_URL,
            dataType: 'json',
            cache: false,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    },
    handleEventSubmit: function(event) {
        var events = this.state.data;
        event.id = Date.now();
        var newEvents = events.concat([event]);
        this.setState({data: newEvents});
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: event,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: events});
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.loadeventsFromServer();
        setInterval(this.loadeventsFromServer, POLL_INTERVAL);
    },
    render: function() {
        return (
            <div>
                <h1>Events</h1>
                <EventList data={this.state.data} />
                <EventForm onEventSubmit={this.handleEventSubmit} />
            </div>
        );
    }
});
