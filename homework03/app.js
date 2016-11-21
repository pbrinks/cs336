/* Paige Brinks, plb7
 * Homework 03 - create DB in mongo to store person objects
 *
 * DUE: 10/29/2016
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
// var getYearsById = function(personIDParam) {
// 	for(var i = 0; i < personArray.length; i++) {
// 		if(personArray[i].personID == personIDParam) {
// 			var today = new Date();
// 			var personDate = new Date(personArray[i].startDate);
// 			var years = today.getFullYear() - personDate.getFullYear();
// 			var m = today.getMonth() - personDate.getMonth();
// 		    if (m < 0 || (m === 0 && today.getDate() < personDate.getDate())) {
// 		        years--;
// 		    }
// 		 return years;
// 		}
// 	}
// }

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
		firstName: req.body.first_name,
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
	// add person not found error?
	db.collection("People").find({id: req.params.id}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

// update person by updated url
app.put('/person/:id', function(req, res) {
	// throw error if isnt correct
	// fix this?

	db.collection("People").update({id: req.params.id}, {firstName: req.params.firstName, lastName: req.params.lastName, startDate: req.params.startDate});

	res.send("New person is " + req.body.firstName + " " + req.body.lastName + " " + req.body.startDate + '\n');
	// })
});

// delete person whose name is put in url
app.delete('/person/:id', function(req, res) {


	db.collection("People").remove({id: req.params.id});
	// .toArray(function(err,docs) {
	// 	if (err) throw err;
	// 	res.json(docs);
	// });

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





// return all people
app.post('/button', function(req,res) {
	db.collection("People").find({}).toArray(function(err, docs) {
 		if (err) throw err;
 		res.send({content: json(docs)});
	});
});

// connect to mongo
MongoClient.connect('mongodb://cs336:bjarne@ds041939.mlab.com:41939/plb7-cs336', function (err, dbConnection) {
  if (err) throw err;
  db = dbConnection;
});