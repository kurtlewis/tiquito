var env = require('dotenv').config();
var mongoose = require('mongoose');
var express = require('express');
var Ticket = require('./models/ticket');

var router = express.Router();

var fieldLengths = {
    problemTitle: 30,
    problemDescription: 500,
    firstName: 30,
    lastName: 30,
    location: 30,
    contactInfo: 30,
    mentorName: 20,
    pin: 4,
    tags: 15,
    comments: 900
}

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
        * ~redir (URL to redirect to on success)

    Success Response:
        Code: 200
        Content: 'success'

    Failure Response:
        Code: 400
        Content: <error message>

*/
router.post('/create',function(req,res){

    if(!validateCreation(req.body, res)){
        res.status(400).send('ticket invalid');
        return;
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
            if(body.redir){
                res.redirect(body.redir);
            } else {
                res.status(200).send('success');
            }
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
        * ~problemTitle
        * ~problemDescription
        * ~firstName
        * ~lastName
        * ~contactInfo
        * ~location
        * ~pin
        * ~tags (Note: this is just a string separated by commas or spaces)
        * ~mentorName
        * ~redir (url to redirect to on success)

    Success Response:
        Code: 200
        Content: 'success'

    Failure Response:
        Code: 400
        Content: <error message>

 */
router.post('/edit',function(req,res){

    var body = req.body;
    
    if(!body.ticketId){
        res.status(400).send('please specify an id');
        return;
    }

    Ticket.findOne({_id: body.ticketId}).exec(function(err,ticket){
        if(err){
            res.status(400).send(err);
        }

        var authed = (body.pin == ticket.pin || body.token == process.env.API_KEY);

        //with the ticket, update values as needed
        if(authed && body.problemTitle && body.problemTitle.length > 0 && body.problemTitle.length <= fieldLengths.problemTitle){
            ticket.problemTitle = body.problemTitle;
        }

        if(authed && body.problemDescription && body.problemDescription.length > 0 && body.problemDescription.length <= fieldLengths.problemDescription){
            ticket.problemDescription = body.problemDescription;
        }

        if(authed && body.firstName && body.firstName.length > 0 && body.firstName.length <= fieldLengths.firstName){
            ticket.creator.firstName = body.firstName;
        }

        if(authed && body.lastName && body.lastName.length > 0 && body.lastName.length <= fieldLengths.lastName) {
            ticket.creator.lastName = body.lastName;
        }

        if(authed && body.location && body.location.length > 0 && body.location.length <= fieldLengths.location) {
            ticket.creator.location = body.location
        }

        if(authed && body.contactInfo && body.contactInfo.length > 0 && body.contactInfo.length <= fieldLengths.contactInfo){
            ticket.creator.contactInfo = body.contactInfo;
        }

        if(authed && body.status && (body.status == 'In progress' || body.status == 'Open' || body.status == 'Closed')){
            ticket.status = body.status;
        }

        if(authed && body.mentorName && body.mentorName.length > 0 && body.mentorName.length <= fieldLengths.mentorName){
            ticket.mentorName = body.mentorName;
        }

        if(authed && body.tags && body.tags.length > 0 && body.tags.length <= fieldLengths.tags){
            ticket.tags = getTagsList(body.tags);
        }

        if(authed && body.comments && validateComments(body.comments)){
            ticket.comments = body.comments;

            //timestamp
            for(var i = 0; i < ticket.comments.length; i++){
                if(!ticket.comments[i].commentTime){
                    ticket.comments[i].commentTime = (new Date()).toISOString();
                }
            }
        }

        ticket.save(function(err){
            if(err){
                res.status(400).send(err)
            } else {
                if(body.redir){
                    res.redirect(body.redir);
                } else {
                    res.status(200).send('success');
                }
            }
        });

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
        * ~search (search phrase)

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

    // pagination
    var offset = parseInt(req.query.offset) || 0;
    var limit = parseInt(req.query.limit) || 10;

    // sorting
    var sortCrit = req.query.sort || '';
    var sortDir = parseInt(req.query.direction) || 0;
    var sort = `-status ${sortDir < 0 ? '-' : ''}${sortCrit} -creationTime`;

    // filtering
    var filter = {};
    if(req.query.filter){
        filter.status = req.query.filter;
    }

    // searching
    if(req.query.search){
        filter.problemTitle = { "$regex": req.query.search, "$options": "i" };
        filter.problemDescription = { "$regex": req.query.search, "$options": "i" };
    }

    Ticket.find(filter,'-pin').
    skip(offset).
    limit(limit).
    sort(sort).
    exec(function(err,data){
        if(err){
            res.status(400).send(err)
            return;
        }

        if(data.length > 0){
            res.status(200).json(data);
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
        Content: <requestedTicket>

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
            return;
        }

        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).send({});
        }
    });
});

/*
    URL: /api/delete

    Method: GET

    Request Parameters (~ --> optional):
        * ticketId (ticketId of the ticket)
        * ~redir (url to redirect to on successful removal)

    Success Response:
        Code: 200
        Content: 'removed'

    Failure Response:
        Code: 400
        Content: <error message>

        Code: 404
        Content: 'not found'
*/
router.get('/delete',function(req,res){
    if(!req.query.token || req.query.token != process.env.API_KEY){
        res.status(401).send('not authorized');
        return;
    }

    if(req.query.ticketId){
        Ticket.findOne({_id: req.query.ticketId}).exec(function(err,data){
            // check for errors while finding ticket
            if(err){
                res.status(400).send(err);
                return;
            }
            
            // if ticket exists, try to delete it
            if(data){
                data.remove(function(err){
                    if(err){
                        res.status(500).send(err);
                    } else {
                        if(body.redir){
                            res.redirect(body.redir);
                        } else {
                            res.status(200).send('removed');
                        }
                    }
                });
            } else {
                res.status(404).send('not found');
            }
        })
    } else {
        res.status(400).send('please enter an id to delete');
    }
});

/*
    URL: /api/comment

    Method: POST

    Request Parameters (~ --> optional):
        * ticketId (ticketId of the ticket)
        * commenterName
        * commentText

    Success Response:
        Code: 200
        Content: 'success'

    Failure Response:
        Code: 400
        Content: <error message>
 */
router.post('/comment',function(req,res){
    var body = req.body;
    
    if(!body.ticketId){
        res.status(400).send('please specify an id');
        return;
    }

    Ticket.findOne({_id: body.ticketId}).exec(function(err,ticket){
        if(err){
            res.status(400).send(err);
            return;
        }

        var newComment = {};
        newComment.commenterName = body.commenterName;
        newComment.commentText = body.commentText;

        if(validateComment(newComment)){
           
            newComment.commentTime = (new Date()).toISOString();
            ticket.comments.push(newComment);
        } else {
             
            res.status(400).send('invalid comment');
            return;
        }

        ticket.save(function(err){
            if(err){
                res.status(400).send(err)
            } else {
                if(body.redir){
                    res.redirect(body.redir);
                } else {  
                    res.status(200).send('success');
                }
            }
        });
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

function validateComments(comments){
    if(!comments){
        return false;
    }
    var isValid = true;
    for(var i = 0; i < comments.length; i++){
        isValid = validateComment(comments[i]);
    }

    return isValid;
}

function validateComment(comment){
    var isValid = true;

    if(!(comment.commenterName && comment.commenterName.length > 0 && comment.commenterName.length <= fieldLengths.comments)){
        isValid = false;
    }

    if(!(comment.commentText && comment.commentText.length > 0 && comment.commentText.length <= fieldLengths.comments)){
        isValid = false;
    }


    return isValid;
}


//checks that all fields in the given ticket object are valid for a newly created object
// returns false
function validateCreation(obj, res){
    var isValid = true;
    //check all require fields are present
    if(!obj.problemTitle || obj.problemTitle.length == 0 || obj.problemTitle.length > fieldLengths.problemTitle){
        res.send("Title must be between 1 and 30 characters")
        isValid = false;
    } else if (!obj.firstName || obj.firstName.length == 0 || obj.firstName.length > fieldLengths.firstName){
        res.send("First name must be between 1 and 20 characters")
        isValid = false;
    } else if (!obj.location || obj.location.length == 0 || obj.location.legth > fieldLengths.location) {
        res.send("Location must be between 1 and 50 characters")
        isValid = false;
    } else if (!obj.pin || obj.pin.length != fieldLengths.pin) {
        res.send("PIN must be 4 characters")
        isValid = false;
    }

    return isValid;
}

module.exports = router;