// ############################################################################
// set environment to test
process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const {before} = require('mocha')
const server = require('../server');

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
var TOKEN = ''
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
// describe('Auction API Tests', ())