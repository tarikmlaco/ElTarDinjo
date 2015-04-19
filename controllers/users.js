/**
 * Created by Elvis on 3/2/2015.
 */
var User = require('../models/user'),
    uid = require('rand-token').uid;

exports.postUsers = function(req, res){
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        token: uid(16)
    });

    user.save(function(err){
        if(err) {
            res.json({message: 'Error creating user, username probably exists.'});
            console.log(err);
        }
        else
        res.json({message: 'User saved!'});
    });
};

exports.loginUser = function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if(err)
            res.send(err);
        user.verifyPassword(req.body.password, function(err, isMatch){
            if(err)
                res.json({error: err});
            if(!isMatch) {
                res.json({error: 'Wrong password!'});
                console.log('Wrong password!');
            }
            else{
                console.log('User logged in!');
            }
            });
         });
};

exports.logoutUser=function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if(err)
            res.send(err);
        user.verifyPassword(req.body.password, function(err, isMatch){
            if(err)
                res.json({error: err});
            if(!isMatch) {
                res.json({error: 'Wrong password!'});
                console.log('Wrong password!');
            }
            else
            {
                res.send('User logged out!');
            }
        });
    });
};

exports.getUsers = function(req, res){
    User.find(function(err, users){
        if(err)
            res.send(err);
        res.json(users);
    });
};