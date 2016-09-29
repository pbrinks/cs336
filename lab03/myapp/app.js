/* Paige Brinks, plb7
 * 9/21/16
 *
 * lab 03
 * hello-world application
 */

 
var express = require('express');
var app = express();

// serve static files
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

