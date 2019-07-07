var express = require('express');
var routeController = require('./controllers/routeController');
var http = require('http');
var httpProxy = require('http-proxy');

var app = express();

//set up tempalte engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
routeController(app);

//listen to port
app.listen(80);

//logs
console.log('You are listening to port 999');
