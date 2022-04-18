const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const auctionSchema = require('./auction').auction;

// configure bidder Schema
const bidder = new Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    auctions: [{
        type: auctionSchema,
        required: false
    }],
    bids: [{
        type: Schema.Types.ObjectId,
        ref: 'Auction'
    }]
}, {
    timestamps: true
})

const Bidder = mongoose.model('Bidder', bidder)

module.exports = Bidder;