// get category model
const Category = require('../models/category').Category

// create a category
exports.createCategory = (req, res) => {
    Category.create({
        title: req.body.title
    }).then(() => {
        res.status(200).json({
            message: 'Category created successfully'
        })
    }).catch(err => {
        res.status(500).json({
            message: `${err.status}-${err.message}`
        })
    })
}