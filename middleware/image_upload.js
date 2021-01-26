const multer = require('multer');
const fs = require('fs');
const {uuid} = require('uuidv4');

// // set up multer for storing uploaded files
// var storage =  multer.diskStorage({
//     destination: (req, file, cb) => {
//         fs.mkdir('./uploads/', (err) => {
//             cb(null, './uploads/');
//         })
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${+ new Date()}.png`)
//     }
// });

// var upload = multer({storage: storage});

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(DIR, (err) => {
            cb(null, DIR);
        })
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = upload;