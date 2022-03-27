// get bidder model
const Bidder = require('../models/bidder');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');


// signup as a bidder
exports.bidderSignup = [
    // execute validator function
    validator(),

    async (req, res) => {
        // check for validations
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({
                errors: errors.array()
            })
        }

        // destructure request Body
        const {username, email, password} = req.body;

        // check if use exist in the db
        const foundUser = await Bidder.findOne({
            email: email
        }).exec()

        if(foundUser){
            res.status(409).json({
                message: `Conflict: User with email - ${email} already exist`
            })
        }

        // Encrypt user password
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // create bidder
        await Bidder.create({
            username: username,
            email: email,
            password: encryptedPassword
        }).then((bidder) => {
            res.status(200).json({
                message: 'Bidder created successfully',
                data: bidder
            })
        }).catch((error) => {
            res.status(500).json({
                message: `${err.status} - ${err.message || "Unable to signup"}`
            })
        })
    }
]

// validate request Body
function validator(){
    return[
        body('username')
        .notEmpty().withMessage("username cannot be empty"),
        body('email')
        .notEmpty().withMessage("email cannot be empty")
        .isEmail().normalizeEmail().withMessage("Not a valid email address"),
        body('password')
        .notEmpty().withMessage("password cannot be empty")
        .isLength({
            min: 6
        }).withMessage("Password too short")
    ]
}