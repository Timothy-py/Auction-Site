const multer = require('multer');  // npm module for parsing file data

// configure multer
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')

// export multer object:upload to use in other module
module.exports = upload;