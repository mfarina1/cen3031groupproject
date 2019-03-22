var config = require('./config'),
    firebase = require("firebase")
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
    FBconfig = {
    apiKey: "AIzaSyC8iqW-J1UCgSg7GHez4SuO51APq_n6AJI",
    authDomain: "cen3031-photography-group3.firebaseapp.com",
    databaseURL: "https://cen3031-photography-group3.firebaseio.com",
    storageBucket: "cen3031-photography-group3.appspot.com",
    },

    mongoose = require('mongoose'),   
    express = require('./express');

firebase.initializeApp(FBconfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
//var storage = firebase.storage();

module.exports.start = function() {
  var app = express.init();
  app.listen(config.port, function() {
    console.log('App listening on port', config.port);
  });
};