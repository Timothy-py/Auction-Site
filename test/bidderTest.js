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

describe('Bidder Authentication API', () => {

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
        done()
        })
    })
})

})
