var express = require('express'),
    path = require('path'),
    http = require('http'),
    oglas = require('./controllers/oglasi'),
    user = require('./controllers/users');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/oglasi', oglas.findAll);
app.get('/users', user.findAll);
app.get('/test', function(req, res){
        res.redirect('/#users');
    });
app.get('/oglasi/:id', oglas.findById);
app.post('/oglasi', oglas.addWine);
app.put('/oglasi/:id', oglas.updateWine);
app.delete('/oglasi/:id', oglas.deleteWine);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
