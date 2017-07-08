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
    URL: /create

    Method: POST

    Body Parameters:
        Required: 
            * 

    Success Response:
        Code: 200
        Content: success

    Failure Response:
        Code: 400
        Content: <error message>

*/
router.use('/create',function(req,res){

    if(!validateCreation(req.body)){
        res.status(400).send('ticket invalid');
    }

    var body = req.body;

    var newTicket = new Ticket({
        ticketId: (new Date()),
        problemTitle: body.problemTitle,
        problemDescription: body.problemDescription || '',
        creator: {firstName: body.firstName, 
                lastName: body.lastName || '',
                contactInfo: body.contactInfo || '',
                location: body.location},
        creationTime: (new Date()).toISOString(),
        pin: body.pin,
        Tags: getTagsList(body.tags) || [''],
        comments: [],
        status: 'Open',
        mentorName: body.mentorName || 'None'
    });

    newTicket.save(function(err){
        if(err){
            res.status(400).send('failure while saving ticket');
        }else{
            res.status(200).send('success');
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

//checks that all fields in the given ticket object are valid for a newly created object
// returns false
function validateCreation(obj){
    isValid = true;
    //check all require fields are present
    if(!obj.problemDescription){
        isValid = false;
    } else if (!obj.firstName){
        isValid = false;
    } else if (!obj.location) {
        isValid = false;
    } else if (!obj.pin) {
        isValid = false;
    }

    return isvalid;

}

module.exports = router;