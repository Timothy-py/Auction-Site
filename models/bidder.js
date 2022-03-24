const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// configure bidder Schema
const bidder = new Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    }
}, {
    timestamps: true
})

const Bidder = mongoose.model('Bidder', bidder)

module.exports = Bidder;