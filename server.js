const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

const fs = require('fs');
const path = require('path');
require('dotenv').config();

// require routes
const auction = require('./routes/auction');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auction', auction);

// setup mongodb connection: connecting to mongo atlas
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB Database connection established successfully');
})

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


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;