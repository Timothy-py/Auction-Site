const multer = require('multer');
const fs = require('fs');

// set up multer for storing uploaded files
var storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir('../uploads/', (err) => {
            cb(null, '../uploads/');
        })
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage: storage});

module.exports = upload;