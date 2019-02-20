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

  
  /**TODO
  Serve static files */
   app.use('/', express.static(__dirname + './../../client'));

  /**TODO 
  Use the listings router for requests to the api */
    
    app.get('/api/listings', listingsRouter, function(req, res){
        console.log("GETTING Listing")
        res.send();
    });
    
     app.post('/api/listings', listingsRouter, function(req, res){
        console.log("Create listing")
        //res.send()
    });
    
   
    app.get('/:listingId', listingsRouter, function(req, res){
        console.log("Read single listing")
        //res.send()
    });
    
    app.put('/api/listings/:listingId', listingsRouter, function(req, res){
        console.log("update listing")
        res.send()
    });
    
    app.delete('/api/listings/:listingId', listingsRouter, function(req, res){
        console.log("update Delete listing")
        res.send()
    });
    
    

  /**TODO 
  Go to homepage for all routes not specified */ 
//OR should it be a *?
    app.get('*', function(req, res){
        console.log("Throwing homepage")
        res.sendFile('index.html')
    });
  return app;
};  