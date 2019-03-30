/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    photoSize: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    trackingNumber: {
        type: String,
        required: true
    },
    /*FBphotoName: {
        type: String,
        required: true
    },*/
    created_at: Date,
    updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function (next) {
    var currentTime = new Date;
    this.updated_at = currentTime;
    if (!this.created_at) {
        this.created_at = currentTime;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;