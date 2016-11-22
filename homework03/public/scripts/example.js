var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
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
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: comments});
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div>
                <h1>People</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment firstName={comment.firstName} lastName={comment.lastName} key={comment.id}>
                    {comment.startDate}
                    {comment.id}
                </Comment>
            );
        });
        return (
            <div>
                {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div>
                <h2>
                    {this.props.firstName} {this.props.lastName}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function() {
        return {firstName: '', lastName: '', startDate: ''};
    },
     handleFirstNameChange: function(e) {
         this.setState({firstName: e.target.value});
     },
     handleLastNameChange: function(e) {
         this.setState({lastName: e.target.value});
     },
     handleStartDateChange: function(e) {
         this.setState({startDate: e.target.value});
     },
    handleSubmit: function(e) {
        e.preventDefault();
        var fName = this.state.firstName.trim();
        var lName = this.state.lastName.trim();
        var sDate = this.state.startDate.trim();
        if (!fName || !lName || !sDate) {
            return;
        }
        this.props.onCommentSubmit({firstName: fName, lastName: lName, startDate: sDate});
        this.setState({firstName: '', lastName: '', startDate: '', id: ''});
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="First Name"
                    value={this.state.firstName} onChange={this.handleFirstNameChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="Last Name"
                    value={this.state.lastName} onChange={this.handleLastNameChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="Start Date"
                    value={this.state.startDate} onChange={this.handleStartDateChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/people" pollInterval={2000} />,
    document.getElementById('content')
);