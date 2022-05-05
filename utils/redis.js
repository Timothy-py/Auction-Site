const util = require('util');
const {createClient} = require('redis');
// const client = createClient(process.env.REDIS_URL)
// client.connect()


const client = createClient(process.env.REDIS_URL);
client.connect = util.promisify(client.connect);

// module.exports = async () => {
client.connect()
console.log('REDIS Client Connected Successfully')
    // return client;
// }


module.exports = client;