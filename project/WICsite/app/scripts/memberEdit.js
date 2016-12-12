import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { MEMBER_URL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {name: '', email: '', year: '', major: '',  role: ''};
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
        $.ajax(MEMBER_URL + "/" + this.props.params.id) .done(function(members) {
            this.setState(members[0]);
        }.bind(this));
    },
    handleNameChange: function(e) {
        this.setState({name: e.target.value});
    },
    handleEmailChange: function(e) {
        this.setState({email: e.target.value});
    },
    handleYearChange: function(e) {
        this.setState({year: e.target.value});
    },
    handleMajorChange: function(e) {
        this.setState({major: e.target.value});
    },
    handleRoleChange: function(e) {
        this.setState({role: e.target.value});
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function() {
    var updatedMember = {
        name: this.state.name.trim(),
        email: this.state.email.trim(),
        year: this.state.year.trim(),
        major: this.state.major.trim(),
        role: this.state.role.trim(),
    };
        $.ajax({
            url: MEMBER_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedMember)
        })
         .done(function(members){
             this.context.router.push('/members');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(
                MEMBER_URL, status, errorThrown.toString());
         }.bind(this));
    },
    handleDelete: function() {
        $.ajax({
            url: MEMBER_URL + "/" + this.props.params.id,
            type: 'DELETE',
        })
         .done(function(members){
            this.context.router.push('/members');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(MEMBER_URL, status, errorThrown.toString());
         }.bind(this));
    },
    render: function() {
        return (
            <div>
                <form className="memberForm">
                    <h1>Member Edit - {this.state.id}</h1>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    /><input
                        type="text"
                        value={this.state.year}
                        onChange={this.handleYearChange}
                    />
                    <input
                        type="text"
                        value={this.state.major}
                        onChange={this.handleMajorChange}
                    />
                    <input
                        type="text"
                        value={this.state.role}
                        onChange={this.handleRoleChange}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});
