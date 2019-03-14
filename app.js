var express = require('express');
var routeController = require('./controllers/routeController');

var app = express();

//set up tempalte engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
routeController(app);


app.listen(999, '0.0.0.0');

//logs
console.log('You are listening to port 999');
