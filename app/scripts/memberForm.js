import React from 'react';
import $ from 'jquery';
// for styling, need to import stylesheet at top and need to put className = "styles.nameofclass"

module.exports = React.createClass({
    getInitialState: function() {
        return {name: '', email: '', year: '', major: '', role: ''};
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
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var email = this.state.email.trim();
        var year = this.state.year.trim();
        var major = this.state.major.trim();
        var role = this.state.role.trim();
        if (!name || !email || !year || !major || !role ) {
            console.log("have not put in all the values");
            return;
        }
        this.props.onMemberSubmit({name: name, email: email, year: year, major: major, role: role});
        this.setState({name: '', email: '', year: '', major: '', role: ''});
    },
    render: function() {
        return (
            <form className="memberForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="name..."
                    value={this.state.name} onChange={this.handleNameChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="email..."
                    value={this.state.email} onChange={this.handleEmailChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="year..."
                    value={this.state.year} onChange={this.handleYearChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="major..."
                    value={this.state.major} onChange={this.handleMajorChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="role..."
                    value={this.state.role} onChange={this.handleRoleChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});
