// ############################################################################
// set environment to test
process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const {before} = require('mocha')
const server = require('../server');
const fs = require('fs');
const path = require('path')

const Bidder = require('../models/bidder');


// Assertion style
chai.should();

chai.use(chaiHttp);
// ############################################################################

describe('Bidder API Tests', () => {

// before running the tests, first delete the test user if it exist in the DB
before(async() => {
    await Bidder.deleteOne({email: 'testuser@gmail.com'})
})
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Test the Signup route
describe('Bidder Signup /bidder/signup', ()=>{
    const bidder = {
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'auth123'
    }

    it("It should register a new bidder", (done)=>{
        chai.request(server)
        .post('/api/bidder/signup')
        .send(bidder)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data')
        done()
        })
    })
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Test the Signin route
describe("Bidder Signin /bidder/signin", ()=>{
    const bidder = {
        email: 'testuser@gmail.com',
        password: 'auth123'
    }

    it("It should Signin the bidder", (done) => {
        chai.request(server)
        .post('/api/bidder/signin')
        .send(bidder)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token')
            TOKEN = res.body.token
        done()
        })
    })
})
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Test list all my auctions route
describe('Bidder auctions /bidder/myauctions', ()=>{

    it('It should list all the auctions of the logged in bidder', (done) => {
        chai.request(server)
        .get('/api/bidder/myauctions')
        .set('token', TOKEN)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('data')
        done()
        })
    })
})
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Test list all my bids route
describe('Bidder bids /bidder/mybids', ()=>{
    
    it('It should return all the bids of the logged in bidder', (done) => {
        chai.request(server)
        .get('/api/bidder/mybids')
        .set('token', TOKEN)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.be.a('string', 'All your bids retrieve successfully')
        done()
        })
    })
})
})


// ############################################################################
describe('Auction API Tests', ()=>{

// describe('Create Auction /api/auction', ()=>{
//     const img_path = path.join(__dirname, './hand.jpg')
//     const img_data = fs.readFileSync(img_path, 'binary', (err, data)=>{
//         if(err){
//             console.error(err)
//             return
//         }
//         console.log(data)
//         return data
//     })
//     const auction = {
//         title: 'test',
//         base_price: 200,
//         description: 'testing item',
//         category: 'Test',
//         start_time: new Date(),
//         end_time: new Date(),
//         image: img_data
//     }

//     it('It should create an Auction item', (done)=>{
//         chai.request(server)
//         .post('/api/auction')
//         .type('form')
//         .send(auction)
//         .set('token', TOKEN)
//         // .attach('image', './hand.jpg')
//         .end((err, res) => {
//             res.should.have.status(201).
//             res.body.should.be.a('object')
//         done()
//         })
//     })
// })

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Test list all Auction items route
describe('All Auctions /auction', ()=>{

    it('It should return all auction items', (done) => {
        chai.request(server)
        .get('/api/auction')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('data')
        done()
        })
    })
})

})

// ############################################################################

describe('Category API Tests', () => {

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Test retrieve auctions in a category route
describe('All auctions in a category /category/{category}/auctions', ()=>{

    it('It should return all auctions in the category', (done)=>{
        chai.request(server)
        .get('/api/category/Test/auctions')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('data')
        done()
        })
    })
}) 
})