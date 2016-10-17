"use strict";
var express = require('express');
var app = express();

// serve static files
app.use(express.static('public2'));

// main page 
app.get('/', function (req, res) {
  res.send('Lab 07');
});

// start up server
app.listen(2000, function () {
  console.log('Listening on port 2000!');
});



