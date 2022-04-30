const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// configure auction db model
const auction = new Schema({
    title: {
        type: String,
        required:true
    },
    base_price: {
        type: Number,
        required: [true, 'Please add a base price']
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: Array,
        required: [true, 'Specify a category for this Auction']
    },
    seller: {
        type: Map,
        of: String,
        required: true
    },
    start_time: {
        type: Date,
        required:true,
    },
    end_time: {
        type: Date,
        required:true,
    },
    image: {
        type: String,
        required: true
    },
    bidders: {
        type: Array,
        required: false
    }
}, {
    timestamps: true
})

// convert auction schema to a model
const Auction = mongoose.model('Auction', auction)

module.exports = {Auction, auction};