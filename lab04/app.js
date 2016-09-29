var express = require('express');
var app = express();

// serve static files
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello!');
});

app.listen(3000, function () {
  console.log('Lab04 - listening on port 3000!');
});
