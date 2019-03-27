var config = require('./config'),
    mongoose = require('mongoose'),
    firebase = require("firebase"),
    FBconfig = {
        apiKey: "AIzaSyC8iqW-J1UCgSg7GHez4SuO51APq_n6AJI",
        authDomain: "cen3031-photography-group3.firebaseapp.com",
        databaseURL: "https://cen3031-photography-group3.firebaseio.com",
        storageBucket: "cen3031-photography-group3.appspot.com"
    },
    express = require('./express');

firebase.initializeApp(FBconfig);

module.exports.start = function() {
  var app = express.init();
  app.listen(config.port, function() {
    console.log('App listening on port', config.port);
  });
};