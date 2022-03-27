const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// configure category Schema
const category = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    }
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