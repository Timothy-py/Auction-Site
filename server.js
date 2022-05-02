// require modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const swaggerDocs = require('./utils/swagger')

require('dotenv').config();

// configure Redis
const redisUrl = "redis://localhost:6379"
const client = redis.createClient(redisUrl)
const redisClient = util.promisify(client.set)

// require routes
const routes = require('./routes/api');

// activate express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// base route
app.use('/api', routes);

const connectDB = async () => {
    // setup mongodb connection: connecting to mongo atlas
    const uri = process.env.ATLAS_URI;

    await mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});
    const connection = mongoose.connection;
    connection.once('open', ()=>{
        console.log('MongoDB Database connection established successfully');
    })
}


app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port: ${port}`);
    swaggerDocs(app, port);
});

// export this file
module.exports = app;