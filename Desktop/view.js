var tickets = [];
var lastClicked = "";
function load(offset) {
    var req = new XMLHttpRequest();
    req.open('GET', "http://test.tiquito.com/api/load", true);
    req.onreadystatechange = function(e) {
        if (this.readyState == 4) {
            var res = JSON.parse(req.responseText);
            console.log(res);
            tickets.concat(res);
            var listView = document.getElementById("listView");
            if (offset == 0) {
                listView.innerHTML = "";
                var titlebar = `
                <h2>All Tickets</h2>
                <h3>Select one to view more details</h3>
                <div id="titlebar">
                    <span class="left">Title</span>
                    <span class="right">Status</span>
                    <span class="center">Tags</span>
                </div>           
                `
                listView.innerHTML = titlebar;
            }
            res.map(function(obj) {
                var row = document.createElement("div");
                row.id = obj._id;
                row.className = "ticket";
                row.addEventListener("click", function(e) {onListClick(e, obj)});
                var title = document.createElement("div");
                var tags = document.createElement("div");
                var status = document.createElement("div");
                console.log(obj);
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

function makeEditable(item) {
    item.contentEditable = "true";
    console.log("here");
}

function changeToP(item) {
    var div = document.getElementById("commentButton");
    div.innerHTML = '<p class="field" id="comment" contentEditable="true"></p>'
    div = document.getElementById("ticketView");
    div.scrollTop = div.scrollHeight;
}

function onListClick(e, ticket) {
    console.log(ticket);
    ticketView = document.getElementById("ticketView");
    ticketView.innerHTML = "";
    var comments = "";
    for (var i = 0; i < ticket.comments.length; i++) {
        comments += '<p class="field" id="comment" onmouseover="makeEditable(this)">' + ticket.comments[i].body + '</p>\n'
    }
    comments += '<div id="commentButton"><button type="button" onclick="changeToP(this)">Add a comment</button></div>'
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
    <select name="status">
        <option value="Open" ${ticket.status == "Open" ? "selected" : ""}>Open</option>
        <option value="In Progress" ${ticket.status == "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Closed" ${ticket.status == "Closed" ? "selected" : ""}>Closed</option>
    </select>
    <p>Mentor Name</p>
    <p class="field" id="mentorname" onmouseover="makeEditable(this)">${ticket.mentorName}</p>
    <p>Tags</p>
    <p class="field" id="tags" onmouseover="makeEditable(this)">${ticket.Tags}</p>
    <p>Comments</p>
    ${comments}
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
load(0);

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