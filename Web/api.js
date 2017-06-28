var env = require('./env');
var mongoose = require('mongoose');
var express = require('express');
var Ticket = require('./models/ticket');

var router = express.Router();

// Create connection to the DB
mongoose.connect(env.MONGO_URL,function(err){
    if(err){
        console.log(`mongo had an error :(. error was : ${err}`);
    }else {
        console.log('no errors in mongo connection!');
    }
});

// Catch mongo runtime errors
mongoose.connection.on('error',function(err){
    console.log(`whoops! mongo hit an error: ${err}`);
});


router.get('/create',function(req,res){
    var newTicket = new Ticket({
        ticketId: 'testONLY',
        problemTitle: 'test',
        problemDescription: 'this is a test',
        creator: {firstName: 'tester', 
                lastName: 'mctesterson',
                contactInfo: 'tester@aol.com',
                location: '123 test st.'},
        creationTime: '2017-06-27T22:04:05+00:00',
        pin: '9999',
        Tags:['testing'],
        comments: [{name: 'troubled tester', 
                body:'i am a tester who is also having trouble with this. I tried to steam it and applying organge but havent had any luck', 
                timestamp: '2017-06-27T22:04:05+00:00'}],
        status: 'Open',
        mentorName: ''
    });
    newTicket.save(function(err){
        if(err){
            res.send('error');
        }else{
            res.send('success');
        }
    });

});

// triggered on request to load more
router.get('/load',function(req,res){
    var query = Ticket.find({},function(err,data){
        res.send(data);
    });
});


// triggered for any get request to the api
router.use('/*',function(req,res){
    var responseObj = {
        'foo': 'bar'
    }
    res.send(responseObj);
});

module.exports = router;