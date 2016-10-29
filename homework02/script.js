/* Paige Brinks, plb7
 * Homework 01 - Configure a webserver to store a set of people records.
 *
 * DUE: 10/5/2016
*/
"use strict";
// var express = require('express');
// var app = express();


// app.use(express.static('public'));

// // main page 
// app.get('/', function (req, res) {
//   res.send('Homework02');
// });


// // start up server
// app.listen(3000, function () {
//   console.log('Homework02 - listening on port 3000!');
// });


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
var personArray = [p1, p2, p3, p4];

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

// display Person with specified id
// if id does not exist, send 404 error
app.get('/person/:id', function(req, res) {
	if(getPersonById(req.params.id) == 0 ) {
		res.status(404).send({ error: "404 - ID not found"});
	 } else {	
	 	res.json(getPersonById(req.params.id));
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

app.post('/data/save', function(req,res) {
	var person = new Person(req.body.firstName, req.body.lastName, 
		req.body.id, req.body.startDate);
	// personArray.
});

