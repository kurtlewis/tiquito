var ticketId = getUrlParameter('ticketId');

//populate the edit field values with the ticket
var ticketUrl = `/api/loadById?ticketId=${ticketId}`;
fetch(ticketUrl)
.then(function(res){
    return res.json();
})
.then(function(ticket){

    //edit title
    document.getElementById('problemTitle').innerText = ticket.problemTitle;

    //edit description
    document.getElementById('problemDescription').innerText = ticket.problemDescription;

    document.getElementById('firstName').innerText = ticket.creator.firstName;

    document.getElementById('lastName').innerText = ticket.creator.lastName;

    document.getElementById('contactInfo').innerText = ticket.creator.contactInfo;

    document.getElementById('location').innerText = ticket.creator.location;

    document.getElementById('tags').innerText = ticket.Tags

    document.getElementById('status').innerText = ticket.status;

    document.getElementById('mentorName').innerText = ticket.mentorName;

});

//fix up the edit redir
console.log('heyyya' + ticketId);
document.getElementById('redir').setAttribute('value',`/detail?ticketid=${ticketId}`);
document.getElementById('ticketId').setAttribute('value',ticketId);


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function tagsToString(tags){
    var tagsStr = '';
    for(var i = 0; i < tags.length; i++){
        tagsStr += ', ' + tags[i];
    }
    return tagsStr.slice(1);
}
