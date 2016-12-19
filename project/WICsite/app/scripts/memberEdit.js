/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * memberEdit.js creates the form for editing members */
import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { MEMBER_URL } from './global';
import style from '../css/style.css';

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
                    <h1>Member Edit - {this.state.name}</h1>
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    /><input className={style.inputFormat}
                        type="text"
                        value={this.state.year}
                        onChange={this.handleYearChange}
                    />
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.major}
                        onChange={this.handleMajorChange}
                    />
                    <input className={style.inputFormat}
                        type="text"
                        value={this.state.role}
                        onChange={this.handleRoleChange}
                    />
                    <div className={style.editButtons}>
                        <button type="button" className={style.buttonFormat} onClick={this.handleUpdate}>Update</button>
                        <button type="button" className={style.buttonFormat} onClick={this.handleDelete}>Delete</button>
                        <Link to='/members' className={style.buttonFormat}>Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
});
