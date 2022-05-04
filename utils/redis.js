const {createClient} = require('redis');
const client = createClient(process.env.REDIS_URL)
client.connect()

module.exports = client;