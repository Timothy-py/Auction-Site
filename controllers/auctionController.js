const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

// get auction model object
const Auction = require('../models/auction');
const Category = require('../models/category').Category
const Bidder = require('../models/bidder');


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

    // send image file to s3 bucket: response = data url
    s3.upload(params, async (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        // get authenticated user email and username
        const user = await Bidder.findById(req.user).exec()

        // get request body data
        const {title, start_time, end_time} = req.body;
        const image = data['Location']

        const category_data = req.body.category.split(",")
        // an array to store all auction categories in the right category schema
        const category = []
        // an array to store the auction categories that do not exist in the db and thus needs to be created
        const category_to_create = []   

        for (let i = 0; i < category_data.length; i++) {
            category.push({title: category_data[i]})
            
            // check if the category with title=category_data[i] exist in the db
            const foundCategory = await Category.findOne({
                title: category_data[i]
            }).exec()

            // if it doesn't exist, push it to the array for creation
            if(!foundCategory){
                category_to_create.push({title: category_data[i]})
            }
        }

        // create categories which do not exist
        await Category.insertMany(category_to_create, (err, result)=>{})

        // create the auction
        const auction = new Auction({
            title,
            start_time,
            end_time,
            image,
            category,
            seller: {}
        });
        auction.seller.set('username', user.username)
        auction.seller.set('email', user.email)

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
