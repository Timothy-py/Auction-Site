const multer = require('multer');

// set up multer for storing uploaded files
var storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage: storage});

module.exports = upload;