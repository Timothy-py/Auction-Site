const router = require('express').Router();

// require controllers
const auctionController = require('../controllers/auctionController')
const categoryController =  require('../controllers/categoryController')
const bidderController = require('../controllers/bidderController')

// require middleware
const upload = require('../middleware/image_upload');
const authenticator = require('../middleware/authenticator');



// AUCTION ROUTES

// get all users
router.get('/auction', auctionController.getAllAuctions);

// create an auction
router.post('/auction', authenticator, upload, auctionController.createAuction);

// bid for an auction
router.patch('/auction/:auction_id/bid', authenticator, auctionController.bidAuction);

// delete an auction
router.delete('/auction/:auction_id', authenticator, auctionController.deleteAuction);

// retrieve an auction item

// retrieve auctions in a particular category

// List all bids for a particular user

// CATEGORY ROUTES
router.post('/category', categoryController.createCategory);

// signup bidder
router.post('/bidder/signup', bidderController.bidderSignup);

// signin bidder
router.post('/bidder/signin', bidderController.bidderSignin);


module.exports = router;