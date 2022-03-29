const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = require('./category').category

// configure auction db model
const auction = new Schema({
    title: {
        type: String,
        required:true,
        unique:true
    },
    category: [categorySchema],
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
    }
}, {
    timestamps: true
})

// convert auction schema to a model
const Auction = mongoose.model('Auction', auction)

module.exports = Auction;