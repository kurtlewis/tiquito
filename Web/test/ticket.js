let env = require('dotenv');
var http = require('http');
let mongoose = require('mongoose');
let Ticket = require('../models/ticket');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should(); // is this part configurable?

chai.use(chaiHttp);
let requestTarget = 'https://tiquito.com';

var port = process.env.TEST_PORT || 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

describe('dummy test',() => {
    it('should pass no matter what',(done) => {
        done();
    });
})

describe('Tickets',()=>{

    describe('/GET tickets',() => {

        it('should get all tickets', (done) => {
            chai.request(requestTarget)
            .get('/api/load')
            .end((err,res) => {
                console.log('err: ' + err + '\n\n\n');
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.least(1);
                done();
            });
        });
        
        
        it('should get a specific ticket', (done) => {
            chai.request(requestTarget)
            .get(`/api/loadById?ticketId=${'596e5cd33cbf0e00a4e94b07'}`)
            .end((err,res) => {
                console.log('res: ' + JSON.stringify(res));
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
            
        });

    });

});