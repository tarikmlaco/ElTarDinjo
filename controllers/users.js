/**
 * Created by Elvis on 3/2/2015.
 */
var mongo = require('mongodb');

var Server = mongo.Server,
    //Db = mongo.Db,
    BSON = mongo.BSONPure;
var databaseUrl = "mongodb://kirija:kirija@ds061621.mongolab.com:61621/kirijaba";

//require mongoose node module
var mongoose = require('mongoose');

//connect to mongodb database
var conn = mongoose.createConnection(databaseUrl);
var db = conn.db;
//attach lister to connected event
mongoose.connection.once('connected', function() {
    console.log("Connected to 'kirija' database");
    db.collection('users', {safe:true}, function(err, collection) {
        //if (err) {
        console.log("The 'users' collection doesn't exist. Creating it with sample data...");
        populateDB();
        //}
        //if (result) {
        // else {console.log('collection exists');}
        //});

    });
  // conn.close();
});

exports.findById = function(req, res) {
    var id = req.params.id;
    var name= req.params.name;
    console.log('Retrieving oglas: ' + id);
    db.collection('oglasi', function(err, collection) {

        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });

        collection.find({'_name':new BSON.ObjectID(id)}, function(err, item){
            res.send(item);
        });
    });
};

exports.findByName = function(req, res) {
    var name= req.params.name;
    db.collection('oglasi', function(err, collection) {
        collection.find({'name':name}, function(err, item){
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var users = [
        {
            name: "Mujo",
            cijena: "2009",
            grapes: "Grenache / Syrah"
        },
        {
            name: "Suljo",
            cijena: "2006",
            grapes: "Tempranillo"
        },
        {
            name: "Tarik",
            cijena: "2010",
            grapes: "Sauvignon Blanc"
        }];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });

};
