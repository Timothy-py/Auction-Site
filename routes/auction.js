const router = require('express').Router();
const upload = require('../middleware/image_upload');

// require middleware
const auctionController = require('../controllers/auction')
const categoryController =  require('../controllers/category')



// AUCTION ROUTES

// get all users
router.get('/auction', auctionController.getAllAuctions);

// create an auction
router.post('/auction', upload, auctionController.createAuction);

// CATEGORY ROUTES
router.post('/category', categoryController.createCategory);


module.exports = router;