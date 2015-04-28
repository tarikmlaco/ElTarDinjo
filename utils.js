/**
 * Created by Tarik on 28.4.2015.
 */
var csrf = require('csurf');


module.exports.createUserSession = function(req, res, user){
    var cleanUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        data: user.data || {}
    };

    req.session.user = cleanUser;
    req.user = cleanUser;
    res.locals.user = cleanUser;
};

module.exports.requireLogin = function(req, res, next){
    if(!req.user){
        res.redirect('/login');

    }
};