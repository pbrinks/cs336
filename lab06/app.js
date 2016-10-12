/* Paige Brinks, plb7
 * 10/12/2016
 *
 * CS 336, lab06,  HTTP
 */

/* Exercise 6.1 question responses:
 * a) Identify the request methods that you can and can’t test using the two tools listed above. 
 *    If a method cannot be testing using a particular tool, explain why this is the case. List the Curl commands you used successfully.
 * 			All the methods can be tested using the command line, however, only the GET method can be tested using the browser.
 * 			Also, only GET can be tested using curl URL, but you can test them all with curl -X method URL -d data -H 'Content-Type: application/json'
 * b) What is the most appropriate HTTP response code for pages that aren’t defined by an Express route?
 * 			404 not found or 400 bad request
 *
 * Exercise 6.2 question responses:
 * a) What HTTP methods do forms support?
 * 		GET and POST, to get the form info on the page and post to get the info inputted into the form 
 * b) How is the form data being passed back to the server and what syntactic form does it take? Is the data modified in any way?
 * 		The form data is being passed back to the server via a body object with the data populated by the post method. The data is not 
 * 		modified, however, the format of the data is.
 *
 */

"use strict";
var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));


// start up server
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

// Respond with Hello World! on the homepage:
app.get('/', function (req, res) {
  res.send('Hello lab 6!' + '\n');
});

// Respond with Hello World! on the homepage:
app.get('/request', function (req, res) {
  res.send('Hello World!'+ '\n');
});

// Respond to POST request on the root route (/), the application’s home page:
app.post('/request', function (req, res) {
  res.send('Got a POST request \n here is the data you sent: ' + req.body.arg + '\n');
});

// Responds to form posts from the forms/index.html
app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br/>Name: '
	     + req.body.user_name + '<br/>E-mail: '
	     + req.body.user_email + '<br/>Message: ' 
	     + req.body.user_message);
});

// Respond to a PUT request to the /user route:
app.put('/request', function (req, res) {
  res.send('Got a PUT request \n here is the data you sent: ' + req.body.arg + '\n');
});

// Respond to a DELETE request to the /user route:
app.delete('/request', function (req, res) {
  res.send('Got a DELETE request \n here is the data you deleted: ' + req.body.arg + '\n');
});

app.all('*', function (req, res) {
	res.send(res.status(HttpStatus.NOT_ACCEPTABLE).send('Page does not exist' + '\n'))
});