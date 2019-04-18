//this is a copy of listing.model.test.js from bootcamp 3
var should = require('should'), 
    mongoose = require('mongoose'), 
    Listing = require('./ListingSchema'), 
    config = require('../server/config/config.js');

var listing, id;

listing =  {
  id: '1',
          name: '11x14, Starts at $49.99',
          value: {
            w: 2750,
            h: 3500
  }, 
}

describe('Listing Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when code and name provided', function(done){
      new Listing({
        name: listing.name, 
        code: listing.code
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when all three properties provided', function(done){
      new Listing(listing).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('throws an error when name not provided', function(done){
      new Listing({
        code: listing.code
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when code not provided', function(done){
      new Listing({
        name: listing.name
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    if(id) {
      Listing.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});
