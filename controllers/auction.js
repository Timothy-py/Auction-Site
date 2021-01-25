const fs = require('fs');
const path = require('path');

const Auction = require('../models/auction');

// list all auctions
exports.getAllAuctions = (req, res) => {
    Auction.find()
        .then(auctions => res.json({
            message: 'All Auctions Retrieved Successfully',
            data: auctions
        }))
        .catch(err => res.json({
            'message': "Unable to List Auctions"
        }))
};


// create an auction
exports.createAuction = (req, res, next) => {
    // get action data from frontend
    var auction = {
        title: req.body.title,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        image: {
            data: fs.readFileSync(path.join('../uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    // load/create auction
    Auction.create(auction)
        .then(() => res.status(201).json({
            message: 'Auction Created Successfully'
        }))
        .catch(err => res.json({
            'message': "Unable to Create Auction",
        }))

}