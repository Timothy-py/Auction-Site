const {createClient} = require('redis');
const client = createClient(process.env.redisUrl)
client.connect()

module.exports = client;