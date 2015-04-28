var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    oglas = require('./controllers/oglasi'),
    user = require('./controllers/users'),
    utils = require('./utils'),
    session = require('express-session');
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');
    morgan = require('morgan');
var app = express();

    app.set('port', process.env.PORT || 3000);
    app.use(morgan('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(bodyParser.urlencoded({
    extended: true
    }));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session({
        secret: "chomlariktariktachomla",
        cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
        resave: false,
        saveUninitialized: false
        }));

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

app.get('/users', utils.requireLogin, user.getUsers);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
