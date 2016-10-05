/* Paige Brinks, plb7
 * Lab 05 - Configure a webserver to store a set of people records.
 *
 * 10/5/2016
*/
"use strict";
var express = require('express');
var app = express();

// serve static files
app.use(express.static('public'));

// main page 
app.get('/', function (req, res) {
  res.send('Lab 05');
});

// start up server
app.listen(3000, function () {
  console.log('Lab 05 - listening on port 3000!');
});
