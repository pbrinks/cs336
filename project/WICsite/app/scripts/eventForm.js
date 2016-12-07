import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
    getInitialState: function() {
        return {name: '', description: '', date: '', time: '', location: '', cost: ''};
    },
    handleNameChange: function(e) {
        this.setState({name: e.target.value});
    },
    handleDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },
    handleDateChange: function(e) {
        this.setState({date: e.target.value});
    },
    handleTimeChange: function(e) {
        this.setState({time: e.target.value});
    },
    handleLocationChange: function(e) {
        this.setState({location: e.target.value});
    },
    handleCostChange: function(e) {
        this.setState({cost: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var description = this.state.description.trim();
        var date = this.state.date.trim();
        var time = this.state.time.trim();
        var location = this.state.location.trim();
        var cost = this.state.cost.trim();
        if (!name || !description || !date || !time || !location || !cost ) {
            return;
        }
        this.props.onEventSubmit({name: name, description: description, date: date, time: time, location: location, cost: cost});
        this.setState({name: '', description: '', date: '', time: '', location: '', cost: '', });
    },
    render: function() {
        return (
            <form className="eventForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="name..."
                    value={this.state.name} onChange={this.handleNameChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="description..."
                    value={this.state.description} onChange={this.handleDescriptionChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="date..."
                    value={this.state.date} onChange={this.handleDateChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="time..."
                    value={this.state.time} onChange={this.handleTimeChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="location..."
                    value={this.state.location} onChange={this.handleLocationChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="cost..."
                    value={this.state.cost} onChange={this.handleCostChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});
