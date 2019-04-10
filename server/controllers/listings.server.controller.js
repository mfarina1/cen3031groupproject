
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {
    console.log("Trying to uplode new photo here")

  /* Instantiate a Listing */
  var listing = new Listing(req.body);
  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
    console.log("Reading one listing")
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;
    console.log("UPDATING ORDER STATUS")

    console.log(listing.orderStatus)
    
    Listing.findOneAndUpdate({ _id: listing.id}, {orderStatus: "Printing"}, function(err, updatedListing){
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else{
            updatedListing.orderStatus = req.body.orderStatus
            console.log(updatedListing.orderStatus)
            res.json(updatedListing);
        } 
    })
    
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;
    console.log("DELETING")
  /** TODO **/
  /* Remove the article */
    Listing.findOneAndRemove({ code: listing.code}, function(err, listing){
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else{
            console.log("DELETING THE LISTING")
            res.json(listing);
        } 
    });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
    console.log("Trying to get all listing here")
    //res.send("Trying to get all listing here")
    Listing.find({}, null, {sort: 'created_at'}, function(err, listing){
        if (err) {
            console.log(err)
            res.status(400).send(err);
        } else{
            console.log("SENDING LISTING")
            res.json(listing);
        }      
    })
};


exports.listUserOrders = function(req, res) {
  /** TODO **/
  /* Your code here */
  	var listing = req.listing;
    console.log("Trying to get users orders here")
    console.log(listing)
    //res.send("Trying to get all listing here")
    Listing.find({'FBUID': '4xgf4i6xb1gXChvcOambr7AO7Tl1'}, null, {sort: 'created_at'}, function(err, listing){
        if (err) {
            console.log(err)
            res.status(400).send(err);
        } else{
            console.log("SENDING LISTINGS")
            res.json(listing);
        }      
    })
};
/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  // Listing.findById(id).exec(function(err, listing) {
  //   if(err) {
  //     res.status(400).send(err);
  //   } else {
  //     req.listing = listing;
  //     next();
  //   }
  // });
  console.log('ID');
  
};