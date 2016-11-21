var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];


var PersonBox = React.createClass({
  render: function() {
    return (
      <div className="personBox">
        <h1>People:</h1>
        <PersonList data={this.props.data} />
        <PersonForm />
      </div>
    );
  }
});


var PersonList = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person author={person.author} key={person.id}>
          {person.text}
        </Person>
      );
    });
    return (
      <div className="PersonList">
        {personNodes}
      </div>
    );
  }
});

var PersonForm = React.createClass({
  render: function() {
    return (
      <div className="personForm">
        Hello, world! I am a personForm.
      </div>
    );
  }
});

var Person = React.createClass({
rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    var md = new Remarkable();
    return (
      <div className="person">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
      <span dangerouslySetInnerHTML={this.rawMarkup()} />      </div>
    );
  }
});


ReactDOM.render(
  <PersonBox data={data} />,
  document.getElementById('content')
);



 <!-- ended on Fetching from the server in the tutorial - but also make sure u understand hook up the data model-->