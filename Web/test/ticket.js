let env = require('dotenv');
let mongoose = require('mongoose');
let Ticket = require('../models/ticket');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should(); // is this part configurable?

chai.use(chaiHttp);

describe('dummy test',() => {
    it('should pass no matter what',(done) => {
        done();
    });
})

describe('Tickets',()=>{
   /* 
    beforeEach((done)=>{
        Ticket.remove({},(err)=>{
            done();
        });
    });
    */



    /*
    describe('/GET tickets',() => {
        let ticketId = '';

        it('should get all tickets', (done) => {
            chai.request(app)
            .get('api/load')
            .end((err,res) => {
                console.log('err: ' + err + '\n\n\n');
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.least(1);
                done();
            });
        });
        
        */
        
        /*
        it('should get a specific ticket', (done) => {
            chai,request(app)
            .get(`/loadById?ticketId=${ticketId}`)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });

            
        });
        

    });

    */

});