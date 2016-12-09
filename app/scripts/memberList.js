import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Member from './member';

module.exports = React.createClass({
    render: function() {
        var memberNodes = this.props.data.map(function(member) {
            return (
                <Member id={member.id} name={member.name} key={member.id}>
                    {member.date}
                    {member.time}
                    {member.description}
                    {member.location}
                    {member.cost}
                </Member>
            );
        });
        return (
            <div className="MemberList">
                {memberNodes}
            </div>
        );
    }
});
