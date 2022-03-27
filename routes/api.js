const router = require('express').Router();
const upload = require('../middleware/image_upload');

// require middleware
const auctionController = require('../controllers/auctionController')
const categoryController =  require('../controllers/categoryController')
const bidderController = require('../controllers/bidderController')



// AUCTION ROUTES

// get all users
router.get('/auction', auctionController.getAllAuctions);

// create an auction
router.post('/auction', upload, auctionController.createAuction);

// CATEGORY ROUTES
router.post('/category', categoryController.createCategory);

// signup bidder
router.post('/bidder/signup', bidderController.bidderSignup);


module.exports = router;