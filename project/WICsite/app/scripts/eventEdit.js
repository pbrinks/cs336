/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * eventEdit.js creates the form for editing events */
 
import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { API_URL } from './global';
import style from '../css/style.css';

module.exports = React.createClass({
    getInitialState: function() {
        return {name: '', description: '', date: '', time: '', location: '', cost: ''};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function() {
        $.ajax(API_URL + "/" + this.props.params.id) .done(function(events) {
            this.setState(events[0]);
        }.bind(this));
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
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function() {
    var updatedEvent = {
        name: this.state.name.trim(),
        description: this.state.description.trim(),
        date: this.state.date,
        time: this.state.time.trim(),
        location: this.state.location.trim(),
        cost: this.state.cost.trim(),

    };
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedEvent)
        })
         .done(function(events){
             this.context.router.push('/events');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    handleDelete: function() {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE',
        })
         .done(function(events){
            this.context.router.push('/events');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    render: function() {
        return (
            <div>
                <form>
                    <h1>Event Edit - {this.state.name}</h1>
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                   <input className={style.inputFormat}
                        type="date"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                    />
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.time}
                        onChange={this.handleTimeChange}
                    />
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.location}
                        onChange={this.handleLocationChange}
                    />
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.cost}
                        onChange={this.handleCostChange}
                    />
                     <textarea className={style.inputFormat}
                        rows="8"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
                    <div className={style.editButtons}>
                        <button type="button" className={style.buttonFormat} onClick={this.handleUpdate}>Update</button>
                        <button type="button" className={style.buttonFormat} onClick={this.handleDelete}>Delete</button>
                        <Link to='/events' className={style.buttonFormat}>Cancel</Link>
                    </div>
                </form>
         
            </div>
        );
    }
});
