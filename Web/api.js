var express = require('express');
var Ticket = require('./models/ticket');

var router = express.Router();

// triggered on request to load more
router.get('/load',function(req,res){
    var query = Ticket.find();
    var tickets = query.exec();
    tickets.then(function(data){
        res.send(data); // might be able to just pass this function in to the then arguments
    });
});

// triggered for any get request to the api
router.use('*',function(req,res){
    console.log('\n\ngot here\n\n')
    var responseObj = {
        'foo': 'bar'
    }
    res.send(responseObj);
});

module.exports = router;