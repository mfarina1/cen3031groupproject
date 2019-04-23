//this is a copy of listing.model.test.js from bootcamp 3
var should = require('should'), 
    mongoose = require('mongoose'), 
    Listing = require('./../../server/models/listings.server.model'), 
    config = require('./../../server/config/config');

var listing, id;

listing = {
    firstName: 'testFirst',
    lastName: 'testLast',
    address: 'testAddress',
    city: 'testCity',
    state: 'testState',
    zipCode: 'testZCode',
    orderStatus: 'testStatus',
    photoSize: 'testSize',
    price: 99,
    medium: 
    'testMedium',
    trackingNumber: 'testTrackingNum',
    FBImageURL: 'testURL',
    FBUID: 'TestUID'
};

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

    it('saves properly when all properties provided', function(done){
      new Listing(listing).save(function(err, listing){
        should.not.exist(err);
        //id = listing.id;
        done();
      });
    });

    it('throws an error when only firstName provided', function(done){
      new Listing({
        firstName: listing.firstName
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when only price provided', function(done){
      new Listing({
        price: 100
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
