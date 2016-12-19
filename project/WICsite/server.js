/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 * 
 * server.js defines HTTP protocols and communicates with the database
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient
var db;
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/* HTTP protocols for events */

// gets future events from the database
app.get('/api/events', function(req, res) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0
    var yyyy = today.getFullYear();

    // add zero before single digit dates
    if (dd < 10){
        dd = '0' + dd;
    } 
    // add zero before single digit months
    if (mm < 10){
        mm = '0'+ mm;
    } 
    var today = yyyy + '-' + mm + '-' + dd;     // reformat todays date to match what is in the db
    db.collection("events").find({"date":{"$gte" : today}}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

//posts an event to the database
app.post('/api/events', function(req, res) {
    var newEvent = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        cost: req.body.cost
    };
    db.collection("events").insertOne(newEvent, function(err, result) {
        if (err) throw err;
        db.collection("events").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});

//gets event with specific id from the database
app.get('/api/events/:id', function(req, res) {
    db.collection("events").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

//puts (edits) event with specific id in the database
app.put('/api/events/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('events').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("events").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

//deletes event with specific id from the database
app.delete('/api/events/:id', function(req, res) {
    db.collection("events").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("events").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});



/* HTTP protocols for events */
// gets member list from the database
app.get('/api/members', function(req, res) {
    db.collection("members").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

//posts a member to the database
app.post('/api/members', function(req, res) {
    var newMember = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        year: req.body.year,
        major: req.body.major,
        role: req.body.role
    };
    db.collection("members").insertOne(newMember, function(err, result) {
        if (err) throw err;
        db.collection("members").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});

//gets member with specific id from the database
app.get('/api/members/:id', function(req, res) {
    db.collection("members").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

//puts (edits) member with specific id in the database
app.put('/api/members/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('members').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("members").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

//deletes member with specific id from the database
app.delete('/api/members/:id', function(req, res) {
    db.collection("members").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("members").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

// Send all routes/methods not specified above to the app root.
app.use('*', express.static(APP_PATH));

//specifies the port to listen on
app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// This assumes that the MongoDB password has been set as an environment variable.
var mongoURL = 'mongodb://cs336:bjarne@ds037597.mlab.com:37597/cs336';
MongoClient.connect(mongoURL, function(err, dbConnection) {
    if (err) throw err;
    db = dbConnection;
});


