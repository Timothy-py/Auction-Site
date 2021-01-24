const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const auction = new Schema({
    title: {
        type: String,
        required:true,
        unique:true
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
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
})

const Auction = mongoose.model('Auction', auction)

module.exports = Auction;