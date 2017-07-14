var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    problemTitle: String,
    problemDescription: String,
    creator: {firstName: String, 
                lastName: String,
                contactInfo: String,
                location: String},
    creationTime: String,
    pin: String,
    Tags:[String],
    comments: [{commenterName: String, 
                commentText:String, 
                commentTime: String}],
    status: String,
    mentorName: String
},{bufferCommands: false});

module.exports = mongoose.model('Ticket',ticketSchema);