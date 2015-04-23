var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    oglas = require('./controllers/oglasi'),
    user = require('./controllers/users');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

//mongoose.connect('mongodb://localhost:27017/kirijaba')
    mongoose.connect('mongodb://kirija:kirija@ds061621.mongolab.com:61621/kirijaba');

app.get('/oglasi', oglas.findAll);
app.get('/users', user.getUsers);
app.get('/test', function(req, res){
        res.redirect('/#users');
    });
app.get('/oglasi/:id', oglas.findById);
app.post('/oglasi', oglas.addOglas);
app.put('/oglasi/:id', oglas.updateOglas);
app.delete('/oglasi/:id', oglas.deleteOglas);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
