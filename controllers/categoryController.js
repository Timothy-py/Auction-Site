// get category model
const Category = require('../models/category').Category
const Auction = require('../models/auction')

// create a category
exports.createCategory = (req, res) => {
    Category.create({
        title: req.body.title
    }).then((category) => {
        res.status(200).json({
            message: 'Category created successfully',
            data: category
        })
    }).catch(err => {
        res.status(500).json({
            message: `${err.status}-${err.message}`
        })
    })
}


// get all auctions in a category
exports.getAuctions = async (req, res) => {
    const category = req.params.category;
    try {
        const auctions = await Category
                            .findOne({title: category})
                            .populate({path: 'auctions', populate: {path: 'auctions'}})
        
        return res.status(200).json({
            message: `All Auctions in ${category} category`,
            data: auctions
        })
    } catch (error) {
        return res.status(500).json({
            message: `${error.message} || Unable to retrieve category auctions`
        })
    }
}