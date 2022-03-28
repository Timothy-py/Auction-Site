const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        // get the user token from request header
        const userToken = req.header('token');

        // if token is not provided: throw Error
        if(!userToken){
            return res.status(401).json({
                message: "Unauthenticated: Provide token"
            })
        }

        // verify token
        const payload = jwt.verify(userToken, process.env.jwtSecret);

        // pass user object to request
        req.user = payload.user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: `${error.message} || Unable to authenticate user`
        })
    }
}