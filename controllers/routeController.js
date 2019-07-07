var vtbController = require('./vtbController');
var bodyParser = require('body-parser');

module.exports = function(app){
  //setup body bodyParser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.get('/home', function(req, res){
    res.render('home');
  });
  app.get('/vtb', function(req, res){
    vtbController.getBoard(req, res);
  });
  app.post('/vtb/add*', function(req, res){
    vtbController.addElement(req, res);
  });
  app.post('/vtb/update*', function(req, res){
    vtbController.updateElement(req, res);
  });
  app.delete('/vtb/remove*', function(req, res){
    vtbController.removeElement(req, res);
  });
  // app.get('/angular/*', function(req, res){
  //   res.render('index');
  // });
  app.get('/*', function(req, res){
    res.render('home');
  });
};
