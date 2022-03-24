const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import schemas
const bidderSchema = require('./bidder')
const auctionSchema = require('./auction')

// configure bids db model
const bid = new Schema({
    bidder: bidderSchema,
    auction: auctionSchema
}, {
    timestamps: true
})


const Bid = mongoose.model('Bid', bid)

module.exports = Bid;
