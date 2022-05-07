const {createClient} = require('redis');

const client = createClient({url:process.env.REDIS_URL});

(async () => {
    client.on('error', (err)=>{
        console.log('Redis Client Error', err);
    })
    client.on('ready', ()=>{
        console.log('Redis Client is ready');
    })

    await client.connect({timeout: 18000});
    console.log('Redis Client connected successfully')
})();

module.exports = client;