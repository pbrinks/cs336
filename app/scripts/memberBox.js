import React from 'react';
import $ from 'jquery';

import MemberList from './memberList';
import MemberForm from './memberForm';
import { MEMBER_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadmembersFromServer: function() {
        $.ajax({
            url: MEMBER_URL,
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
    handleMemberSubmit: function(member) {
        var members = this.state.data;
        member.id = Date.now();
        var newMembers = members.concat([member]);
        this.setState({data: newMembers});
        $.ajax({
            url: MEMBER_URL,
            dataType: 'json',
            type: 'POST',
            data: member,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: members});
             console.error(MEMBER_URL, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.loadmembersFromServer();
        setInterval(this.loadeventsFromServer, POLL_INTERVAL);
    },
    render: function() {
        return (
            <div>
                <h1>Members</h1>
                <MemberList data={this.state.data} />
                <MemberForm onMemberSubmit={this.handleMemberSubmit} />
            </div>
        );
    }
});
