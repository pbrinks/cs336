/* Paige Brinks, plb7
 * Homework 02 - Configure a webserver to store a set of people records.
 * 		added ability to create Person object through form and receive Person info 
 * 		through other form
 * DUE: 10/29/2016
*/
"use strict";
var express = require('express');
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public2'));

// main page 
app.get('/', function (req, res) {
  res.send('Homework02');
});


// start up server
app.listen(3000, function () {
  console.log('Homework02 - listening on port 3000!');
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
	
// instances of person object
var p1 = new Person("Paige", "Brinks", 1, "2013/08/28");
var p2 = new Person("Lydia", "Cupery", 2, "2000/05/13");
var p3 = new Person("Tammie", "Thong", 3, "2011/09/06");
var p4 = new Person("Keith", "Vander Linden", 4, "2005/03/21");

// array of people
var personArray = new Array();
personArray[0] = p1;
personArray[1] = p2;
personArray[2] = p3;
personArray[3] = p4;


/* getPersonById(personIDParam), returns person with given ID
 * Param: personIDParam, the ID of the person you want returned
 * return a Person, person with ID of personIDParam
 */
var getPersonById = function(personIDParam) {
	
	for(var i = 0; i < personArray.length; i++) {
		if(personArray[i].personID == personIDParam) {
			return personArray[i];
		}
	}

	return 0;

}

/* getNameByID(personIDParam), returns name of person with given ID
 * Param: personIDParam, the ID of the person whose name you want returned
 * return a string, name of person with ID of personIDParam
 */
var getNameById = function(personIDParam) {
	for(var i = 0; i < personArray.length; i++) {
		if(personArray[i].personID == personIDParam) {
			return personArray[i].firstName + " " + personArray[i].lastName;
		}
	}

}

/* getYearsByID(personIDParam), returns years in organization of person with given ID
 * Param: personIDParam, the ID of the person whose years you want returned
 * return a int, years of person with ID of personIDParam
 */
var getYearsById = function(personIDParam) {
	for(var i = 0; i < personArray.length; i++) {
		if(personArray[i].personID == personIDParam) {
			var today = new Date();
			var personDate = new Date(personArray[i].startDate);
			var years = today.getFullYear() - personDate.getFullYear();
			var m = today.getMonth() - personDate.getMonth();
		    if (m < 0 || (m === 0 && today.getDate() < personDate.getDate())) {
		        years--;
		    }
		 return years;
		}
	}
}

// display all Person objects
app.get('/people', function(req, res) {
	res.json({personArray});
});

// create new person from form data
app.post('/people', function(req,res) {
	console.log(req.body);
	var person = new Person(req.body.first_name, req.body.lastName, 
		req.body.id, req.body.startDate);
	personArray[personArray.length] = person;
});

// display Person with specified id
// if id does not exist, send 404 error
app.get('/person/:id', function(req, res) {
	if(getPersonById(req.params.id) == 0 ) {
		res.status(404).send({ error: "404 - ID not found"});
	 } else {	
	 	res.json(getPersonById(req.params.id));
	}
});

// update person by updated url
app.put('/person/:id', function(req, res) {
	if(getPersonById(req.params.id) == 0 ) {
		res.status(404).send({ error: "404 - ID not found"});
	} else {
		for (var i = 0; i < personArray.length; i++) {
			if(personArray[i].personID == req.params.id) {
				personArray[i].firstName = req.body.firstName;
				personArray[i].lastName = req.body.lastName;
				personArray[i].startDate = req.body.startDate;
			}
		}
		res.send("New person is " + req.body.firstName + " " + req.body.lastName + " " + req.body.startDate);
	}
});

// delete person whose name is put in url
app.delete('/person/:id', function(req, res) {
	if(getPersonById(req.params.id) == 0 ) {
		res.status(404).send({ error: "404 - ID not found"});
	} else {
		for (var i = 0; i < personArray.length; i++) {
			if(personArray[i] != null && req.params != null) {
				if(personArray[i].personID == req.params.id) {
					delete personArray[i];
					res.send("Deleted Person with Id " + req.params.id);
				}

			}
		}
	}
});

// display name of Person with specified id
// if id does not exist, send 404 error
app.get('/person/:id/name', function(req, res) {
	if(getPersonById(req.params.id) == 0 ) {
		res.status(404).send({ error: "404 - ID not found"});
	 } else {
		res.json(getNameById(req.params.id));
	}
});

// display years of Person with specified id
// if id does not exist, send 404 error
app.get('/person/:id/years', function(req,res) {
	if(getPersonById(req.params.id) == 0 ) {
		res.status(404).send({ error: "404 - ID not found"});
	 } else {
		res.json(getYearsById(req.params.id));
	}
});

// return Person info of user inputted ID from form
app.post('/form', function(req,res) {
	var p = new Person();
	p = getPersonById(req.body.person_id);
	var response = "First Name: " + p.firstName + '\n' + "Last Name: " + 
		p.lastName + '\n' + "Person ID: " + p.personID + '\n' + "Start Date: "
		+ p.startDate;
	res.send({"content": response});
});