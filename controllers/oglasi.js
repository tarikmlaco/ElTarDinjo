//var mongo = require('mongodb');
/*

var Server = mongo.Server,
   // Db = mongo.Db,
    BSON = mongo.BSONPure;
*/

//var databaseUrl = "mongodb://kirija:kirija@ds061621.mongolab.com:61621/kirijaba";
//var databaseUrl = "mongodb://localhost:27017/kirijaba";

//require mongoose node module
var mongoose = require('mongoose');
var Oglas = require('../models/oglas')
//connect to mongodb database
    //mongoose.connection.db;
//attach lister to connected event
/*
db.once('open', function() {
        console.log("Connected to 'kirija' database");
        db.collection('oglasi', {safe:true}, function(err, collection) {
            if (err)
            console.log(err);
            collection.find(function(err, items){
               if(err)
                console.log("Error!");
               if(items == null)
                console.log("Collection is empty");
               else(console.log(items));
            });
                //console.log(collection);
                console.log("The 'oglasi' collection doesn't exist. Creating it with sample data...");
                populateDB();

            //else(console.log("Collection already exists! Continuing."));

        });
    //conn.close();
});*/

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving oglas: ' + id);
    db.collection('oglasi', function(err, collection) {
        collection.findOne({'_id': new mongoose.Types.ObjectId(id)}, function(err, item) {
            if(err){
            res.send(err);
            console.log("Id not found!");}
            console.log("Id found!");
            console.log(item);
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    Oglas.find(function(err, items) {
        if(err)
            res.json(err);
          res.json(items);

    });
};

exports.addOglas = function(req, res) {
    var oglas = req.body;
    console.log('Adding oglas: ' + JSON.stringify(oglas));
    db.collection('oglasi', function(err, collection) {
        collection.insert(oglas, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateOglas = function(req, res) {
    var id = req.params.id;
    var oglas = req.body;
    delete oglas._id;
    console.log('Updating oglas: ' + id);
    console.log(JSON.stringify(oglas));
    db.collection('oglasi', function(err, collection) {
        collection.update({'_id': new mongoose.Types.ObjectId(id)}, oglas, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating oglas: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(oglas);
            }
        });
    });
}

exports.deleteOglas = function(req, res) {
    var id = req.params.id;
    console.log('Deleting oglas: ' + id);
    db.collection('oglasi', function(err, collection) {
        collection.remove({'_id': new mongoose.Types.ObjectId(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
/*
var populateDB = function() {

    var oglasi = [
    {
        name: "APARTMAN NA BRECI",
        cijena: "300",
        description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely oglas, which makes an excellent complement to fish dishes.",
        picture: "apartman1.jpg"
    },
    {
        name: "DUPLEX U VOGOŠĆI",
        cijena: "400",
        description: "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert oglas market. Light and bouncy, with a hint of black truffle, this oglas will not fail to tickle the taste buds.",
        picture: "apartman2.jpg"
    },
    {
        name: "STAN NA ALIPAŠINOM POLJU",
        cijena: "500",
        description: "The cache of a fine Cabernet in ones oglas cellar can now be replaced with a childishly playful oglas bubbling over with tempting tastes of black cherry and licorice. This is a taste sure to transport you back in time.",
        picture: "apartman3.jpg"
    }];

    db.collection('oglasi', function(err, collection) {
        collection.insert(oglasi, {safe:true}, function(err, result) {
            if(err)
            console.log(err);
        });
    });

};*/
