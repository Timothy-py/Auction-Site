const router = require('express').Router();
const upload = require('../middleware/image_upload');

const auctionController = require('../controllers/auction')



// AUCTION ROUTES

// get all users
router.get('/all', auctionController.getAllAuctions);

// create an auction
router.post('/create', upload.single('image'), auctionController.createAuction);


module.exports = router;