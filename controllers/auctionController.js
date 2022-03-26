const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

// get auction model object
const Auction = require('../models/auction');
const Category = require('../models/category').Category


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


// configure amazon s3 bucket
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

// create an auction
exports.createAuction = (req, res, next) => {
    let image = req.file.originalname.split(".")
    const fileType = image[image.length - 1]

    const params = {
        Bucket: "auctionappbucket",
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    // send image file to s3 bucket
    s3.upload(params, async (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        const title = req.body.title
        const start_time = req.body.start_time
        const end_time = req.body.end_time
        const image = data['Location']
        const category = new Category({
            title: req.body.category
        })

        const auction = new Auction({
            title,
            start_time,
            end_time,
            image,
            category
        });

        await auction.save()
            .then((data) => {
                res.status(201).json({
                    message: "Auction created successfully",
                    data: data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: `${err.status} - ${err.message}`
                })
            })
    })
}
