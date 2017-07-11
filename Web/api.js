var env = require('dotenv').config();
var mongoose = require('mongoose');
var express = require('express');
var Ticket = require('./models/ticket');

var router = express.Router();

// Create connection to the DB
mongoose.connect(process.env.MONGO_URL,function(err){
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
    URL: /api/create

    Method: POST

    Body Parameters (~ --> optional):
        * problemTitle
        * ~problemDescription
        * firstName
        * ~lastName
        * ~contactInfo
        * location
        * pin
        * ~tags (Note: this is just a string separated by commas or spaces)
        * ~mentorName

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

/*
Important, will need to fix flaw that allows user to overwrite any ticket if they have the id
^Only protection is client-side validation (boo)

Endpoint for editing a ticket. Takes a ticket object and overwrites the object with the given id

URL: /api/edit

    Method: POST

    Body Parameters (~ --> optional):
        * problemTitle
        * ~problemDescription
        * firstName
        * ~lastName
        * ~contactInfo
        * location
        * pin
        * ~tags (Note: this is just a string separated by commas or spaces)
        * ~mentorName

    Success Response:
        Code: 200
        Content: success

    Failure Response:
        Code: 400
        Content: <error message>

 */
router.use('/edit',function(req,res){
    
    if(!validateCreation(req.body)){
        res.status(400).send('ticket invalid');
    }

    var body = req.body;

    Ticket.update({ticketId: body.ticketId},
    {
        ticketId: body.ticketId,
        problemTitle: body.problemTitle,
        problemDescription: body.problemDescription,
        creator: {firstName: body.firstName, 
                lastName: body.lastName,
                contactInfo: body.contactInfo,
                location: body.location},
        creationTime: body.creationTime,
        pin: body.pin,
        Tags: getTagsList(body.tags),
        comments: body.comments,
        status: body.status,
        mentorName: body.mentorName
    },function(err){
        if(!err){
            res.status(200).send('success');
        } else {
            res.status(400).send(err);
        }
    });

});

/*
    URL: /api/load

    Method: GET

    Request Parameters (~ --> optional):
        * ~offset (The amount to skip before first entry)
        * ~limit (Max number of entries to get)

    Success Response:
        Code: 200
        Content: <list of requested tickets>

    Failure Response:
        Code: 400
        Content: <error message>
 */
router.get('/load',function(req,res){
    var offset = parseInt(req.query.offset) || 0;
    var limit = parseInt(req.query.limit) || 10;

    Ticket.find({}).skip(offset).limit(limit).exec(function(err,data){
        if(err){
            res.status(400).send(err)
        }
        res.status(200).send(data);
    });
});

/*
    URL: /api/loadById

    Method: GET

    Request Parameters (~ --> optional):
        * id (ticketId of the ticket)

    Success Response:
        Code: 200
        Content: requestedTicket

    Failure Response:
        Code: 400
        Content: <error message>
 */
router.get('/loadById',function(req,res){

    Ticket.findOne({ticketID: req.body.id}).exec(function(err,data){
        if(err){
            res.status(400).send(err)
        }
        res.status(200).send(data);
    });
});

// triggered for any get request to the api
router.use('/*',function(req,res){
    res.status(200).send('welcome to the api');
});

function getTagsList(str){
    var delim = '~!~';
    str = str.replace(',',' ').replace('  ',' ').replace(' ',delim);
    return str.split(delim);
}

//checks that all fields in the given ticket object are valid for a newly created object
// returns false
function validateCreation(obj){
    var isValid = true;
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

    return isValid;

}

module.exports = router;