const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auction = require('../models/auction');

// configure category Schema
const category = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    auctions: [
        {
            type: ObjectId,
            ref: Auction
        }
    ]
}, {
    // schema options
    timestamps: true    
})

// category.query.byTitle = function(title){
//     return this.find({
//         title: title
//     })
// }

const Category = mongoose.model('Category', category)

module.exports = {category, Category};