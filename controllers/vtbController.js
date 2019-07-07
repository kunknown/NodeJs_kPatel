//required
var mongoose = require('mongoose');

//global variables
var ID = '';

//conenct to the database
mongoose.connect('', {useNewUrlParser: true});

//Create a Schemas
var ticketSchema = new mongoose.Schema({
  order: Number,
  title: String,
  details: String
});
var sectionSchema = new mongoose.Schema({
  order: Number,
  title: String,
  tickets: [ticketSchema]
});
var boardSchema = new mongoose.Schema({
  title: String,
  sections: [sectionSchema]
});

//create a model
var vtb = mongoose.model('vtb', boardSchema);

//export module
module.exports.getBoard = function(req, res){

  vtb.findOne({}).then(data =>{
    if(data === null){
      var defaultBoard = vtb({
        title: '',
        sections: [{
          title: '',
          tickets: [{
            title: '',
            details: ''
          }]
        }]
      }).save().then(product =>{
        ID = product._id;
        res.render('vtb', {board: product});
      })
      .catch(err =>{
        console.log(err);
      });
    }
    else{
      ID = data._id;
      res.render('vtb', {board: data});
    }
  });
};

module.exports.addElement = async function(req, res){
  urlParser(req.url);
  let action = await urlParser.action;
  var sectionId = urlParser.section;
  var ticketId = urlParser.ticket;
  var newTicket = {title: '', details: ''};
  var newSection = {title: '', tickets: [{title: '', details: ''}]};

  if(action === 'addticket'){
    try{
      let data = await vtb.findOne({});
      index = data.sections.map(function(e){return e._id.toString();}).indexOf(sectionId);
      data.sections[index].tickets.push(newTicket);
      try{
        let promise = await data.save();
        if(promise){
          res.type("text/plain").send("ticket added");
        }
      }
      catch(err){
        console.log(err);
      }
    }
    catch(err){
      console.log(err);
    }

    // vtb.findOne({}).then(data =>{
    //   var index = data.sections.map(function(e){return e._id.toString();}).indexOf(sectionId);
    //   data.sections[index].tickets.push(newTicket);
    //   data.save().then(product => {
    //     res.type("text/plain").send("item saved to database");
    //   })
    //   .catch(err => {
    //     res.status(400).send("unable to save to database");
    //   });
    // });
  }

  else if(action === 'addsection'){
    try{
      let data = await vtb.findOne({});
      data.sections.push(newSection);
      try{
        let promise = await data.save();
        if(promise){
          res.type("text/plain").send("section added")
        }
      }
      catch(err){
        console.log(err);
      }
    }
    catch(err){
      console.log(err);
    }
    // vtb.findOne({}).then(data => {
    //   data.sections.push(newSection);
    //   data.save().then(product =>{
    //     res.type("text/plain").send("item saved to database");
    //   })
    //   .catch(err =>{
    //     console.log(err);
    //   });
    // })
    // .catch(err =>{
    //   console.log(err);
    // });
  }
};

module.exports.updateElement = function(req, res){
  urlParser(req.url);
  var action = urlParser.action;
  console.log('action: ' + action);
  var sectionId = urlParser.section;
  var ticketId = urlParser.ticket;
  var updatedText = req.body;
  if(action === 'updatetickettitle'){
    vtb.findOne({}, function(err, data){
      if(err){
        console.log(err);
      }
      var sectionIndex = data.sections.map(function(e){return e._id.toString();}).indexOf(sectionId);
      var ticketIndex = data.sections[sectionIndex].tickets.map(function(e){return e._id.toString();}).indexOf(ticketId);
      data.sections[sectionIndex].tickets[ticketIndex].title = updatedText.title;
      data.save(function(err, product){
        if(err){
          console.log(err);
        }
      });
    });
  }
  else if(action === 'updateticketdetails'){
    vtb.findOne({}, function(err, data){
      if(err){
        console.log(err);
      }
      var sectionIndex = data.sections.map(function(e){return e._id.toString();}).indexOf(sectionId);
      var ticketIndex = data.sections[sectionIndex].tickets.map(function(e){return e._id.toString();}).indexOf(ticketId);
      data.sections[sectionIndex].tickets[ticketIndex].details = updatedText.details;
      data.save(function(err, product){
        if(err){
          console.log(err);
        }
      });
    });
  }
  else if(action === 'updatesectiontitle'){
    vtb.findOne({}, function(err, data){
      if(err){
        console.log(err);
      }
      var sectionIndex = data.sections.map(function(e){return e._id.toString();}).indexOf(sectionId);
      data.sections[sectionIndex].title = updatedText.title;
      data.save(function(err, product){
        if(err){
          console.log(err);
        }
      });
    });
  }
  else if(action === 'updateboardtitle'){
    vtb.findOne({}, function(err, data){
      if(err){
        console.log(err);
      }
      data.title = updatedText.title;
      data.save(function(err, product){
        if(err){
          console.log(err);
        }
      });
    });
  }
};

module.exports.removeElement = async function(req, res){
  urlParser(req.url);
  var action = urlParser.action;
  console.log('action: ' + action);
  var sectionId = urlParser.section;
  var ticketId = urlParser.ticket;
  if(action === 'removeticket'){
    try{
      let data = await vtb.findOne({});
      var sectionIndex = data.sections.map(function(e){return e._id.toString();}).indexOf(sectionId);
      if(data.sections[sectionIndex].tickets.length > 1){
          data.sections[sectionIndex].tickets.id(ticketId).remove();
          try{
            let promise = await data.save();
            if(promise){
              res.type("text/plain").send("ticket removed");
            }
          }catch(err){
            console.log(err);
          }
      }
      else{
        res.type("text/plain").send("Need at least 1 ticket on the board...");
        console.log("Need at least 1 ticket on the board...");
      }
      }catch(err){
        console.log(err);
    }
    // vtb.findOne({}).then(data =>{
    //   var sectionIndex = data.sections.map(function(e){return e._id.toString();}).indexOf(sectionId);
    //   if(data.sections[sectionIndex].tickets.length > 1){
    //     data.sections[sectionIndex].tickets.id(ticketId).remove();
    //     data.save().then(product =>{
    //       res.type("text/plain").send("item saved to database");
    //     })
    //     .catch(err =>{
    //       console.log(err);
    //     });
    //   }
    //   else{
    //     res.type("text/plain").send("Need at least 1 ticket on the board...");
    //     console.log('Need at least 1 ticket on the board...');
    //   }
    // })
    // .catch(err =>{
    //   console.log(err);
    // });
  }
  else if(action === 'removesection'){
    try{
      let data = await vtb.findOne({});
      data.sections.id(sectionId).remove();
      try{
        let promise = await data.save();
        if(promise){
          res.type("text/plain").send("section removed");
        }
      }catch(err){
        console.log(err);
      }
    }catch(err){
      console.log(err);
    }

    // vtb.findOne({}).then(data =>{
    //   if(data.sections.length > 1){
    //     data.sections.id(sectionId).remove();
    //     data.save().then(product =>{
    //       res.type("text/plain").send("item saved to database");
    //     })
    //     .catch(err =>{
    //       console.log(err);
    //     });
    //   }
    //   else{
    //     res.type("text/plain").send("Need at least 1 section on the board...");
    //     console.log('Need at least 1 section on the board...');
    //   }
    // })
    // .catch(err =>{
    //   console.log(err);
    // });
  }
};

function urlParser(url){
  var urlList = url.toString().split('/');
  if(urlList.length > 3){
    var eleList = urlList[3].toString().split('&');
    var sectionId = '';
    var ticketId = '';
    for(i=0; i<eleList.length; i++){
      if(eleList[i].includes('section')){
        sectionId = eleList[i].split('=')[1];
      }
      if(eleList[i].includes('ticket')){
        ticketId = eleList[i].split('=')[1];
      }
    }
  }
  urlParser.action = urlList[2].toString().toLowerCase();
  urlParser.section = sectionId;
  urlParser.ticket = ticketId;
}
