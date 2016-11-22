/* Paige Brinks, plb7
 * Homework 03 - create DB in mongo to store person objects
 *
 * DUE: 11/18/2016
*/
"use strict";
var express = require('express');
const bodyParser = require("body-parser");

var app = express();
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var db;


// main page 
app.get('/', function (req, res) {
  res.send('Homework03');
});


// start up server
app.listen(3000, function () {
  console.log('Homework03 - listening on port 3000!');
});


// Person Object
class Person {
	constructor(firstName, lastName, personID, startDate) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.personID = personID;
		this.startDate = startDate;
	}
}

// display all Person objects
app.get('/people', function(req, res) {
	// res.json({personArray});
	db.collection("People").find({}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

// create new person from form data
app.post('/people', function(req,res) {
	var newPerson = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		id: req.body.id,
		startDate: req.body.startDate
	};
	db.collection("People").insertOne(newPerson, function(err, result) {
		if (err) throw err;
		db.collection("People").find({}).toArray(function(err, docs) {
			if (err) throw err;
			res.json(docs);
		});
	});
});

// display Person with specified id
app.get('/person/:id', function(req, res) {
	db.collection("People").find({id: req.params.id}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

// update person by updated url
app.put('/person/:id', function(req, res) {
	db.collection("People").update({id: req.params.id}, {$set: {firstName: req.params.firstName, lastName: req.params.lastName, startDate: req.params.startDate}}, {multi: true});
	res.send("New person is " + req.body.firstName + " " + req.body.lastName + " " + req.body.startDate + '\n');
});

// delete person whose name is put in url
app.delete('/person/:id', function(req, res) {
	db.collection("People").remove({id: req.params.id});	
	res.send("Person deleted.\n");

});


// display name of Person with specified id
// if id does not exist, send 404 error
app.get('/person/:id/name', function(req, res) {
	 db.collection("People").find({id: req.params.id}, {firstName: 1} ).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

// display years of Person with specified id
// if id does not exist, send 404 error
app.get('/person/:id/years', function(req,res) {

	db.collection("People").find({id: req.params.id}, {startDate: 1}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	}) 
});


// return Person info of user inputted ID from form
// app.post('/form', function(req,res) {
// 	var p = new Person();
// 	p = getPersonById(req.body.person_id);
// 	var response = "First Name: " + p.firstName + '\n' + "Last Name: " + 
// 		p.lastName + '\n' + "Person ID: " + p.personID + '\n' + "Start Date: "
// 		+ p.startDate;
// 	res.send({"content": response});
// });

// connect to mongo
MongoClient.connect('mongodb://cs336:bjarne@ds041939.mlab.com:41939/plb7-cs336', function (err, dbConnection) {
  if (err) throw err;
  db = dbConnection;
});