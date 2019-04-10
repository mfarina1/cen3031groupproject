var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json()); 
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
  
  /**TODO
  Serve static files */
   app.use('/', express.static(__dirname + './../../client'));

  /**TODO 
  Use the listings router for requests to the api */
    
    app.get('/api/listings', listingsRouter, function(req, res){
        console.log("GETTING Listing")
        res.send();
    });
    
    app.get('/upload',function(req,res){
        res.sendFile(path.join(__dirname+'/../../client/upload.html'));
    });

    app.get('/size',function(req,res){
      res.sendFile(path.join(__dirname+'/../../client/size.html'));
    });

    app.get('/material',function(req,res){
      res.sendFile(path.join(__dirname+'/../../client/material.html'));
    });
    
    app.get('/trackOrder',function(req,res){
      res.sendFile(path.join(__dirname+'/../../client/trackOrder.html'));
    });

    app.get('/login',function(req,res){
      res.sendFile(path.join(__dirname+'/../../client/login.html'));
    });

    app.get('/payment',function(req,res){
      res.sendFile(path.join(__dirname+'/../../client/payment.html'));
    });

    app.get('/dashboard',function(req,res){
        res.sendFile(path.join(__dirname+'/../../client/dashboard.html'));
    });
    
     app.post('/api/listings', listingsRouter, function(req, res){
        console.log("Create listing")
        //res.send()
    });
    
    app.get('/listingId/:UID', listingsRouter, function(req, res){
        console.log("Read single listing")
        res.send()
    });
    
    
    app.put('/api/listings/:listingId', listingsRouter, function(req, res){
        console.log("update listing")
        res.send()
    });
    
    app.delete('/api/listings/:listingId', listingsRouter, function(req, res){
        console.log("update Delete listing")
        res.send()
    });
    
    listingsRouter.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/client/home.html'));
  //__dirname : It will resolve to your project folder.
});


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}




//add the router
app.use(express.static(__dirname + '/client'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.
    

    
  /**TODO 
  Go to homepage for all routes not specified */ 
//OR should it be a *?
    app.get('*', function(req, res){
        console.log("Throwing homepage")
        res.sendFile(path.join(__dirname+'/../../client/home.html'));
    });
  return app;
};  