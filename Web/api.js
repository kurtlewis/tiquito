var env = require('./env');
var express = require('express');
var Ticket = require('./models/ticket');

var router = express.Router();

router.get('/create',function(req,res){
    console.log('create api was hit!');
    var newTicket = new Ticket({
        ticketId: 'testONLY',
        problemTitle: 'test',
        problemDescription: 'this is a test',
        creator: {firstName: 'tester', 
                lastName: 'mctesterson',
                contactInfo: 'tester@aol.com',
                location: '123 test st.'},
        creationTime: '2017-06-27T22:04:05+00:00',
        pin: 'test',
        Tags:['testing'],
        comments: [{name: 'troubled tester', 
                body:'i am a tester who is also having trouble with this. I tried to steam it and applying organge but havent had any luck', 
                timestamp: '2017-06-27T22:04:05+00:00'}],
        status: 'Open',
        mentorName: 'tester'
    });
    console.log('about to save');
    newTicket.save(function(err){
        if(err){
            console.log('error: '+ err);
            res.send('nah');
        }else{
            console.log('no error');
            res.send('that went well!');
        }
    });

});
/*
// triggered on request to load more
router.get('/load',function(req,res){
    console.log('gonna try load some tickets!\n\n\n\n');
    var query = Ticket.findOne({},function(err,data){
        res.send(data);
    });
});
*/

// triggered for any get request to the api
router.use('/*',function(req,res){
    var responseObj = {
        'foo': 'bar'
    }
    res.send(responseObj);
});

module.exports = router;