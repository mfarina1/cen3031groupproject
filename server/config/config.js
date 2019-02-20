//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://user:password1@ds123556.mlab.com:23556/mark-lawrence-bootcamp3', //place the URI of your mongo database here.
  }, 
  port: 8080
};