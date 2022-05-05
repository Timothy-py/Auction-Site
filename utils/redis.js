const {createClient} = require('redis');


const client = createClient(process.env.REDIS_URL);

(async () => {
    await client.connect();
    console.log('Redis Client Connected Successfully')
})();

module.exports = client;