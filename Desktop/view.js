/*Scripts for Tiquito desktop app*/

/*Globals*/
// List of all currently displayed tickets
var tickets = [];
// ID of last ticket in list, used for catching duplicates in load function
var lastClicked = "";

require('dotenv').config();

/*Load function
  Takes offset (number of tickets to skip), count (maximum number of tickets to fetch)
  Skips any duplicate tickets, but duplicates are counted in count parameter*/
function load(offset, count) {
    var req = new XMLHttpRequest();
    req.open('GET', "https://tiquito.com/api/load?offset=" + offset + "&limit=" + count, true);
    req.onreadystatechange = function(e) {
        if (this.readyState == 4) {
            var res = JSON.parse(req.responseText);
            var listView = document.getElementById("listView");
            if (offset == 0) {
                listView.innerHTML = "";
                var titlebar = `
                <button id="refresh" type="button" onclick="load(0, 15)">&#x27f3; Refresh</button>&nbsp;
                <h2>All Tickets</h2>
                <h3>Select one to view more details</h3>
                <div id="titlebar">
                    <span class="left">Title</span>
                    <span class="right">Status</span>
                    <span class="center">Tags</span>
                </div>           
                `
                listView.innerHTML = titlebar;
                tickets = [];
            }
            if (tickets.length > 0) {
                var lastTicketId = tickets[tickets.length - 1]._id;
                for (var i = 0; i < res.length; i++) {
                    if (res[i]._id == lastTicketId) {
                        res = res.slice(i + 1, res.length);
                        break;
                    }
                }
            }
            tickets = tickets.concat(res);
            res.map(function(obj) {
                var row = document.createElement("div");
                row.id = obj._id;
                row.className = "ticket";
                row.addEventListener("click", function(e) {onListClick(e, obj)});
                var title = document.createElement("div");
                var tags = document.createElement("div");
                var status = document.createElement("div");
                title.innerHTML = obj.problemTitle;
                title.className = "ticketTitle";
                tags.innerHTML = obj.Tags;
                tags.className = "ticketTags";
                status.innerHTML = obj.status;
                status.className = "ticketStatus";
                row.appendChild(title);
                row.appendChild(tags);
                row.appendChild(status);
                listView.appendChild(row);
            });
        }
    }
    req.send();
}

/*Onclick function to make an html item editable
  Takes clicked item*/
function makeEditable(item) {
    item.contentEditable = "true";
}

/*Onclick function to change the "add a comment" button to an editable paragraph
  Takes clicked button
  NOTE: clicked button must be in a div with id "commentButton"*/
function changeToP(item) {
    var div = document.getElementById("commentButton");
    div.innerHTML = '<p class="field comment" contentEditable="true"></p>'
    div = document.getElementById("ticketView");
    div.scrollTop = div.scrollHeight;
}

/*Onscroll function for listview to load more tickets when scrolled to bottom
  Takes scrolled item*/
function onListViewScroll(listView) {
    console.log("scrolling");
    if (listView.scrollTop === (listView.scrollHeight - listView.offsetHeight)) {
        load(tickets.length, 10);
    }
}

/*Onclick function to submit edits made to a ticket*/
function submit() {
    var id = document.getElementsByClassName("highlight")[0].id;
    var ticketToEdit = tickets.find(x => x._id == id);
    if (ticketToEdit) {
        console.log(ticketToEdit);
        ticketToEdit.token = process.env.TOKEN;
        ticketToEdit.ticketId = ticketToEdit._id;
        ticketToEdit.problemTitle = document.getElementById("title").innerHTML;
        ticketToEdit.problemDescription = document.getElementById("description").innerHTML;
        var name = document.getElementById("name").innerHTML;
        if (!name.endsWith(' ') && name.indexOf(' ') > -1) {
            ticketToEdit.firstName = name.substr(0,name.indexOf(' '));
            ticketToEdit.lastName = name.substr(name.indexOf(' ') + 1);
            ticketToEdit.creator.firstName = name.substr(0,name.indexOf(' '));
            ticketToEdit.creator.lastName = name.substr(name.indexOf(' ') + 1);
        }
        else {
            ticketToEdit.firstName = name;
            ticketToEdit.lastName = "";
            ticketToEdit.creator.firstName = name;
            ticketToEdit.creator.lastName = "";
        }
        ticketToEdit.location = document.getElementById("location").innerHTML;
        ticketToEdit.contactInfo = document.getElementById("contactinfo").innerHTML;
        ticketToEdit.creator.location = ticketToEdit.location;
        ticketToEdit.creator.contactInfo = ticketToEdit.contactInfo;
        ticketToEdit.status = document.getElementById("status").options[document.getElementById("status").selectedIndex].value;
        ticketToEdit.mentorName = document.getElementById("mentorname").innerHTML;
        ticketToEdit.Tags = document.getElementById("tags").innerHTML;
        ticketToEdit.tags = ticketToEdit.Tags;
        var comments = document.getElementsByClassName("comment");
        var initLength = ticketToEdit.comments.length;
        for (var i = ticketToEdit.comments.length - 1; i >= 0; i--) {
            if (comments[i].innerHTML == "") {
                delete comments[i];
                ticketToEdit.comments.splice(i, 1);
            }
            else {
                ticketToEdit.comments[i].commentText = comments[i].innerHTML;
            }
            console.log(ticketToEdit.comments);
        }
        if (comments.length - 1 == initLength && comments[comments.length - 1].innerHTML != "" ) {
            var newComment = {};
            newComment.commentText = comments[comments.length - 1].innerHTML;
            var mentor = document.getElementById("mentorname").innerHTML;
            newComment.commenterName = mentor != "None" ? mentor : "Anonymous Organizer";
            ticketToEdit.comments.push(newComment);
        }
        console.log(ticketToEdit.comments);

        var req = new XMLHttpRequest();
        req.open('POST', 'https://tiquito.com/api/edit', true);
        var strToSend = JSON.stringify(ticketToEdit);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onreadystatechange = function() {
            console.log("changed");
            if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
                alert("Success!");
                load(0, tickets.length);
            }
            else if (req.readyState == XMLHttpRequest.DONE) {
                alert("Error " + req.status);
            }
        }
        console.log(strToSend);
        req.send(strToSend);
    }
}

/*Onclick function to display the full contents of a ticket
  Takes event, clicked ticket*/
function onListClick(e, ticket) {
    ticketView = document.getElementById("ticketView");
    ticketView.innerHTML = "";
    var comments = "";
    for (var i = 0; i < ticket.comments.length; i++) {
        comments += '<p class="field comment" onmouseover="makeEditable(this)">' + ticket.comments[i].commentText + '</p>\n'
    }
    comments += '<div id="commentButton"><button type="button" onclick="changeToP(this)">Add a comment</button></div>'
    var submitChanges = '<div id="submitButton"><button type="button" onclick="submit()">Submit Changes</button></div>'
    var html = `
    <p>Title</p>
    <p class="field" id="title" onmouseover="makeEditable(this)">${ticket.problemTitle}</p>
    <p>Name</p>
    <p class="field" id="name" onmouseover="makeEditable(this)">${ticket.creator.firstName + " " + ticket.creator.lastName}</p>
    <p>Contact Info</p>
    <p class="field" id="contactinfo" onmouseover="makeEditable(this)">${ticket.creator.contactInfo}</p>
    <p>Description</p>
    <p class="field" id="description" onmouseover="makeEditable(this)">${ticket.problemDescription}</p>
    <p>Location</p>
    <p class="field" id="location" onmouseover="makeEditable(this)">${ticket.creator.location}</p>
    <p>Status</p>
    <select name="status" id="status">
        <option value="Open" ${ticket.status == "Open" ? "selected" : ""}>Open</option>
        <option value="In progress" ${ticket.status == "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Closed" ${ticket.status == "Closed" ? "selected" : ""}>Closed</option>
    </select>
    <p>Mentor Name</p>
    <p class="field" id="mentorname" onmouseover="makeEditable(this)">${ticket.mentorName}</p>
    <p>Tags</p>
    <p class="field" id="tags" onmouseover="makeEditable(this)">${ticket.Tags}</p>
    <p>Comments</p>
    ${comments}
    <p>Timestamp</p>
    <p class="field noevents" id="timestamp">${ticket.creationTime}</p>
    ${submitChanges}
    `
    ticketView.innerHTML = html;
    var prev = document.getElementById(lastClicked);
    if (prev) {
        prev.className = "ticket";
    }
    var current = document.getElementById(ticket._id);
    current.className = "ticket highlight";
    lastClicked = ticket._id;
}

// main
load(0, 15);

/* Sample Ticket Here
Tags:Array[2]
__v:0
_id:"5967d8b2cffe97009c80c58e"
comments:Array[0]
creationTime:"2017-07-13T20:31:46.940Z"
creator:Object
mentorName:"None"
problemDescription:"There aren't enough requirements!!!!1!!"
problemTitle:"We need more requirements"
status:"Open"
ticketId:"Thu Jul 13 2017 20:31:46 GMT+0000 (UTC)"
__proto__:Object
*/
