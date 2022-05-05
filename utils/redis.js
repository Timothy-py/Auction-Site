const {createClient} = require('redis');

console.log(process.env.REDIS_URL)

const client = createClient({url:process.env.REDIS_URL});

(async () => {
    await client.connect();
    console.log('Redis Client Connected Successfully')
})();

module.exports = client;