const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

// get auction model object
const Auction = require('../models/auction').Auction;
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

        try {
            // get authenticated user email and username
            const user = await Bidder.findById(req.user).exec()

            // get request body data
            const {title, start_time, end_time, base_price, description} = req.body;
            const image = data['Location']

            const category_data = req.body.category.split(",")
            // an array to store all auction categories in the right category schema

            // ***********************************************
            // create the auction
            const auction = new Auction({
                title,
                base_price,
                description,
                start_time,
                end_time,
                image,
                category: [],
                seller: {}
            });
            // auction.seller.set('username', user.username)
            auction.seller.set('email', user.email)
            for (let i = 0; i < category_data.length; i++){
                auction.category.push(category_data[i])
            }

            // create auction
            const saveAuction = await auction.save()
            const auction_id = saveAuction._id
            
            // save auction data into Category
            for (let i = 0; i < category_data.length; i++) {
                
                // check if the category with title=category_data[i] exist in the db
                const foundCategory = await Category.findOne({
                    title: category_data[i]
                }).exec()

                // if category exists
                if(foundCategory){
                    foundCategory.auctions.push(auction_id)
                    await foundCategory.save()
                }else{
                    // create category and add auction
                    const category = new Category({
                        title: category_data[i],
                        auctions: []
                    })
                    category.auctions.push(auction_id)
                    await category.save()
                }
            }

            //save auction data into Bidder
            user.auctions.push(auction)
            await user.save();

            return res.status(201).json({
                message: "Auction created successfully",
                data: saveAuction
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Unable to create auction',
                error: error.message
            })
        }
    })
}



// bid for an auction item
exports.bidAuction = async (req, res) => {
    const auction_id = req.params.auction_id
    const price = req.body.price

    if(!price){
        return res.status(400).json({
            message: "Please include your bidding price."
        })
    }

    // find the auction
    const auction = await Auction.findById(auction_id, 'bidders').exec()

    // if the auction with the specified id cannot be found in the db
    if(!auction){
        return res.status(404).json({
            message: `The requested Auction with _id-${auction_id} does not exist.`
        })
    }

    // find the bidder
    const bidder = await Bidder.findById(req.user).exec()

    
    let auctionBidders = auction.bidders
    const totalBidders = auctionBidders.length;
    const biddersEmail = []
    for(let i=0; i<totalBidders; i++){
        biddersEmail.push(auctionBidders[i].email)
    }

    // add a new bidder
    if(totalBidders == 0 || !biddersEmail.includes(bidder.email)){

        try {
            // set bidder info
            const bidderInfo = {
                // username: bidder.username,
                email: bidder.email,
                price: price
            }
            auction.bidders.push(bidderInfo)
            const response = await auction.save()

            // save bid into Bidder object
            bidder.bids.push(auction._id)
            await bidder.save()
            
            return res.status(200).json({
                message: 'Bid successfully',
                data: response
            })
        } catch (error) {
            return res.status(500).json({
                message: `${error} || 'Unable to bid'}`
            })   
        }
    }else{
        try {
            // update the price
            await Auction.updateOne(
                {_id: auction_id, "bidders.email": bidder.email},
                {$set: {'bidders.$.price': price}}
            )

            return res.status(200).json({
                message: 'Bid updated successfully'
            })
        } catch (error) {
            return res.status(500).json({
                message: `${error} || 'Unable to bid'`
            })
        }
    }
}

// delete an auction item
exports.deleteAuction = async (req, res) => {
    const auction_id = req.params.auction_id

    // find the current user
    const bidder = await Bidder.findById(req.user).exec();

    // find the auction seller
    const auction = await Auction.findById(auction_id, 'seller').exec()

    if(!auction){
        return res.status(404).json({
            message: 'The Auction does not exist'
        })
    }

    // check if curent user is the seller
    if(!(bidder.email == auction.seller.get('email'))){
        return res.status(403).json({
            message: 'Unauthorised: You are not the seller of this Auction'
        })
    }

    const query = await auction.remove();

    if(query.$isDeleted()){
        return res.status(200).json({
            message: 'Auction deleted successfully'
        })
    }else{
        return res.status(500).json({
            message: `${query} || 'Unable to delete auction'`
        })
    }
}

// retrieve an auction item
exports.getAuction = async (req, res) => {
    const auction_id = req.params.auction_id

    const query = await Auction.findById(auction_id).exec()

    if(query){
        return res.status(200).json({
            message: "Auction retrieved successfully",
            data: query
        })
    }else{
        return res.status(500).json({
            message: `${query} || Auction does not exist`
        })
    }
}