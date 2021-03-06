var should = require('should'), 
    fs = require('fs'),
    request = require('request');

/* Globals */
var listings;

/*
  Describe blocks organize your unit tests into distinct categories of functionality.
 */
describe('Photography App Server Unit Tests', function() {

  /*
    This before hook loads the JSON data to the listings variable, so that we can compare 
    the response to 'http://localhost:8080' to the data we expect to recieve. 
   */
  // before(function(done) {
  //   fs.readFile('listings.json', 'utf8', function(err, data) {
  //     listings = JSON.parse(data);

  //     /*
  //       Calling done() will pass code execution to the next appropriate block of code. 
  //       In this case, execution will pass to the first it() statement.  
  //      */
  //     done();
  //   });
  // });

  describe('Server responds to requests', function() {
    it('should respond', function(done) {
      /*
        The request module allows us to make HTTP requests. This module could also be useful in 
        making API calls to web services you make use of in your application, such as Google Maps. 
       */
      request.get('http://localhost:8080', function(error, response, body) {
        /*
          The 'should' module is an assertion library. Assertions allow us to compare the functions
          that we are testing to the values we expect to recieve back. In this block, we expect that the 
          server should respond to a request made. 

          Note in this unit test we are only testing the existence of a response, and are not concerned 
          with what is contained in the response.
         */
        should.not.exist(error);
        should.exist(response);
        done();
      });
    });
  });

  describe('Server provides homepage when address is correct, throws error when incorrect', function() {
    it('responds correctly to a GET request to "/"  (homepage)', function(done) {
      request.get('http://localhost:8080/', function(error, response, body) {
        should.not.exist(error);
        should.exist(body);

          //bodyData = JSON.parse(body);
          //should.deepEqual(__dirname + '/client/home.html', bodyData);
        done();
      });
    });
      //For all other requests, doesn't give 404 error but instead routes to 404redirect
    it('responds with a 404redirect page to other GET requests', function(done) {
      request.get('http://localhost:8080/pizza', function(error, response, body) {
          should.not.exist(error);
          should.exist(body);
        //body.should.be.exactly('Bad gateway error');
        done();
      });
    });
  });
})
