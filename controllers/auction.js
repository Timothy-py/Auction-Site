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
    console.log(req.file.path)
    const path = req.file.path;
    var auction = {
        title: req.body.title,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        // image: {
        //     data: fs.readFileSync(path.join('./uploads/' + req.body.image.name)),
        //     contentType: 'image/png'
        // }
        image: {path}
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