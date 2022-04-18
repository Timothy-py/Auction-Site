const router = require('express').Router();

// require controllers
const auctionController = require('../controllers/auctionController')
const categoryController =  require('../controllers/categoryController')
const bidderController = require('../controllers/bidderController')

// require middleware
const upload = require('../middleware/image_upload');
const authenticator = require('../middleware/authenticator');



// AUCTION ROUTES

// get all auctions
router.get('/auction', auctionController.getAllAuctions);

// create an auction
router.post('/auction', authenticator, upload, auctionController.createAuction);

// bid for an auction
router.patch('/auction/:auction_id/bid', authenticator, auctionController.bidAuction);

// delete an auction
router.delete('/auction/:auction_id', authenticator, auctionController.deleteAuction);

// retrieve an auction item
router.get('/auction/:auction_id', auctionController.getAuction);


// track the number of bidders for an auction

// CATEGORY ROUTES
router.post('/category', categoryController.createCategory);

// retrieve auctions in a particular category
router.get('/category/:category/auctions', categoryController.getAuctions);


// BIDDER ROUTES

// signup bidder
router.post('/bidder/signup', bidderController.bidderSignup);

// signin bidder
router.post('/bidder/signin', bidderController.bidderSignin);

// List all auctions of a particular bidder
router.get('/bidder/myauctions', authenticator, bidderController.myAuctions);

// List all bids for a particular user
router.get('/bidder/mybids', authenticator, bidderController.myBids);


module.exports = router;