const router = require('express').Router();

// require controllers
const auctionController = require('../controllers/auctionController')
const categoryController =  require('../controllers/categoryController')
const bidderController = require('../controllers/bidderController')
const bidController =  require('../controllers/bidController');

// require middleware
const upload = require('../middleware/image_upload');
const authenticator = require('../middleware/authenticator');



// AUCTION ROUTES

// get all users
router.get('/auction', auctionController.getAllAuctions);

// create an auction
router.post('/auction', upload, auctionController.createAuction);

// CATEGORY ROUTES
router.post('/category', categoryController.createCategory);

// signup bidder
router.post('/bidder/signup', bidderController.bidderSignup);

// signin bidder
router.post('/bidder/signin', bidderController.bidderSignin);

// create a bid
router.post('/bid/:auction_id', authenticator, bidController.createBid);

module.exports = router;