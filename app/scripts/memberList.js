import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Member from './member';

module.exports = React.createClass({
    render: function() {
        var memberNodes = this.props.data.map(function(member) {
            return (
                <Member id={member.id} name={member.name} email={member.email} year={member.year} major={member.major} 
                    role={member.role} key={member.id}></Member>
            );
        });
        return (
            <div>
                {memberNodes}
            </div>
        );
    }
});
