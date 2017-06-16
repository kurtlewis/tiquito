var express = require('express');
var router = express.Router();

// triggered for any get request to the api
router.get(function(req,res){
    var responseObj = {
        foo: bar
    }
    res.send(responseObj);
});

module.exports = router;