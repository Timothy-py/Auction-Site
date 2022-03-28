const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// configure bids db model
const bid = new Schema({
    bidder_name: {
        type: String,
        required: true
    },
    bidder_email: {
        type: String,
        required: true
    },
    auction_title: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    start_time:{
        type: Date,
        required: true
    },
    end_time:{
        type: Date,
        required: true
    },
    category:{
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const Bid = mongoose.model('Bid', bid)

module.exports = Bid;
