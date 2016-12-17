import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Member from './member';

module.exports = React.createClass({
    render: function() {
        var memberNodes = this.props.data.map(function(member) {
            return (
                <Member id={member.id} name={member.name} key={member.id}>
                    {member.email}
                    {member.year}
                    {member.major}
                    {member.role}
                </Member>
            );
        });
        return (
            <div>
                {memberNodes}
            </div>
        );
    }
});
