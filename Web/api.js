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

/*

*/
router.use('/create',function(req,res){
    var newTicket = new Ticket({
        ticketId: req.body.ticketId,
        problemTitle: req.body.problemTitle,
        problemDescription: req.body.problemDescription,
        creator: {firstName: req.body.firstName, 
                lastName: req.body.lastName,
                contactInfo: req.body.contactInfo,
                location: req.body.location},
        creationTime: (new Date()).toISOString(),
        pin: req.body.pin,
        Tags: getTagsList(req.body.tags),
        comments: [],
        status: 'Open',
        mentorName: 'None'
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

function getTagsList(str){
    var delim = '~!~';
    str = str.replace(',',' ').replace('  ',' ').replace(' ',delim);
    return str.split(delim);
}

module.exports = router;