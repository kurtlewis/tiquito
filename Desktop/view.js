var req = new XMLHttpRequest();
var tickets = [];
req.open('GET', "http://test.tiquito.com/api/load", true);
req.onreadystatechange = function(e) {
    if (this.readyState == 4) {
        var res = JSON.parse(req.responseText);
        console.log(res);
        tickets.concat(res);
        var table = document.getElementById("res");
        res.map(function(obj) {
            var row = table.insertRow();
            row.id = obj._id;
            row.addEventListener("click", function(e) {onListClick(e, obj)});
            var title = row.insertCell();
            var tags = row.insertCell();
            var status = row.insertCell();
            console.log(obj);
            title.innerHTML = obj.problemTitle;
            tags.innerHTML = obj.Tags;
            status.innerHTML = obj.status;
        });
    }
}
req.send();

function onListClick(e, ticket) {
    console.log(ticket);
    ticketView = document.getElementById("ticketView");
    ticketView.innerHTML = "";
    var para = document.createElement("p");
    para.innerHTML = ticket.problemTitle;
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = "Name";
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = ticket.creator.firstName + " " + ticket.creator.lastName;
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = "Contact Info";
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = ticket.creator.contactInfo;
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = "Description";
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = ticket.problemDescription;
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = "Location";
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = ticket.creator.location;
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = "Status";
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = ticket.status;
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = "Mentor Name";
    ticketView.appendChild(para);
    para = document.createElement("p");
    para.innerHTML = ticket.mentorName;
}

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