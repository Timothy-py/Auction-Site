const router = require('express').Router();
const upload = require('../middleware/image_upload');

// require middleware
const auctionController = require('../controllers/auction')



// AUCTION ROUTES

// get all users
router.get('/all', auctionController.getAllAuctions);

// create an auction
router.post('/create', upload, auctionController.createAuction);


module.exports = router;