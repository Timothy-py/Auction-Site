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

    // generates a random identifier
    let file_key = Math.random().toString(12).substring(2,15)
    var auction = {
        title: req.body.title,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        image: {
            data: fs.readFileSync(path.join('./uploads/' + file_key)),
            contentType: 'image/png'
        }
    }
    // load/create auction
    Auction.create(auction)
        .then(() => res.status(201).json({
            message: 'Auction Created Successfully'
        }))
        .catch(err => res.json({
            'Error Code': err.status,
            'message': "Unable to Create Auction",
            'Error Message': err
        }))

}