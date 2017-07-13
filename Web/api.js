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
        * ticketId
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

    Ticket.update({_id: body.ticketId},
    {
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
        * ~sort (criteria to sort by, can be any attribute in the model, Eg: creationTime, problemTitle)
        * ~direction (direction to sort: -1 for descending, 1 for ascending)
        * ~filter (status to filter by. Eg: 'Open', 'Closed')

    Success Response:
        Code: 200
        Content: <list of requested tickets>

    Failure Response:
        Code: 400
        Content: <error message>

        Code: 404
        Content: []
 */
router.get('/load',function(req,res){

    //pagination
    var offset = parseInt(req.query.offset) || 0;
    var limit = parseInt(req.query.limit) || 10;

    //sorting
    var sortCrit = req.query.sort || '';
    var sortDir = parseInt(req.query.direction) || 0;
    var sort = `-status ${sortDir < 0 ? '-' : ''}${sortCrit} -creationTime`;

    //filtering
    var filter = {};
    if(req.query.filter){
        filter.status = req.query.filter;
    }

    Ticket.find(filter,'-pin').
    skip(offset).
    limit(limit).
    sort(sort).
    exec(function(err,data){
        if(err){
            res.status(400).send(err)
        }
        if(data.length > 0){
            res.status(200).send(data);
        } else {
            res.status(404).send(data);
        }
    });
});

/*
    URL: /api/loadById

    Method: GET

    Request Parameters (~ --> optional):
        * ticketId (ticketId of the ticket)

    Success Response:
        Code: 200
        Content: requestedTicket

    Failure Response:
        Code: 400
        Content: <error message>

        Code: 404
        Content: {}
 */
router.get('/loadById',function(req,res){
    if(!req.query.ticketId){
        res.status(400).send('please specify an id');
        return;
    }
    Ticket.findOne({_id: req.query.ticketId},'-pin').exec(function(err,data){
        if(err){
            res.status(400).send(err)
        }
        if(data){
            res.status(200).send(data);
        } else {
            res.status(404).send({});
        }
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
    if(!obj.problemTitle){
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