const redis = require('../utils/redis');

module.exports = async (req, res, next) => {
    const auction_id = req.params.auction_id;

    const cachedAuction = await redis.get(auction_id)
    
    if(cachedAuction){
        return res.status(200).json({
            message: "Auction retrieved from Cache",
            data: JSON.parse(cachedAuction)
        })
    }

    next()
}