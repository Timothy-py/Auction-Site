const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

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


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

// create an auction
exports.createAuction = (req, res, next) => {

    let image = req.file.originalname.split(".")
    const fileType = image[image.length - 1]

    const params = {
        Bucket: "myauctionbuckettest",
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        // get action data from frontend
        var auction = {
            title: req.body.title,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            image: data['Location']
        }

        console.log(auction)

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
            
    })

    

}