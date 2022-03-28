// get Bid model
const Bid = require('../models/bid');
const Auction = require('../models/auction');
const Bidder = require('../models/bidder');


exports.createBid = async(req, res) => {
    const auction_id = req.params.auction_id
    const price = req.body.price

    if(!price){
        return res.status(400).json({
            message: "Please include your bidding price."
        })
    }

    // find the bidder
    const bidder = await Bidder.findById(req.user).exec()

    // find the auction
    const foundAuction = await Auction.findById(auction_id).exec()

    // if the auction with the specified id cannot be found in the db
    if(!foundAuction){
        return res.status(404).json({
            message: `The requested Auction with _id-${auction_id} does not exist.`
        })
    }

    // push all the title of the Auction into an array
    const auction_category = []
    for(let i=0; i<foundAuction.category.length; i++){
        const category_obj = foundAuction.category[i]
        auction_category.push(category_obj.title)
    }

    // create bid object
    const bid = new Bid({
        bidder_name: bidder.username,
        bidder_email: bidder.email,
        auction_title: foundAuction.title,
        start_time: foundAuction.start_time,
        end_time: foundAuction.end_time,
        image: foundAuction.image,
        price: price,
        category: auction_category
    })

    // save bid into db
    await bid.save()
        .then((data) => {
            res.status(201).json({
                message: 'Bid created successfully',
                data: data
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: `${error.status} - ${error.message || "Unable to create bid"}`
            })
        })

}