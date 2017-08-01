function createNode(element){
    return document.createElement(element);
}

function append(parent, el){
    return parent.appendChild(el);
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



function renderTable() {
    fetch(url)
.then((resp) => resp.json())
.then(function(ticket) {

    document.getElementById('Ticketid').innerHTML = `<h3>Ticket ID: ${ticket._id}</h3>`;
    setTimeout(function(){
        
    document.getElementById('redir').setAttribute('value','/detail?ticketid='+ticket._id);

    document.getElementById('ticketId').setAttribute('value',ticket._id);

    },200)
    
    ticketident = ticket._id;

    document.getElementById('TicketTitle').innerHTML = `<h3>Title: ${ticket.problemTitle}</h3>`;

    
    document.getElementById('FirstName').innerHTML = ticket.creator.firstName;

    document.getElementById('Location').innerHTML = ticket.creator.location;

    document.getElementById('TicketStatus').innerHTML = ticket.status;

    document.getElementById('ProblemDescription').innerHTML = ticket.problemDescription || 'No Description.';

    document.getElementById('Mentor').innerHTML = ticket.mentorName;

    document.getElementById('Tags').innerHTML = ticket.Tags || 'No Description.';

    document.getElementById('CreationDate').innerHTML = ticket.creationTime || 'No Description.';

    var list = ticket.comments;

    list.forEach(function(curr){
        let tr = createNode('tr'),
            td1= createNode('td'),
            td2= createNode('td'),
            td3= createNode('td');
            td1.innerHTML = curr.commentText;
            td2.innerHTML = curr.commentTime;
            td3.innerHTML = curr.commenterName;

            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(table, tr);


    })
    
})
.catch(function(error){
    console.log(error);
})
}

function searchfunction(){
    var searchquery = document.getElementById("searchbox").value;

    window.location.href = '/list?search='+searchquery+'&';
}

var ticketident;

function editcall(){
    window.location.href = '/edit?ticketId=' + ticketident;
}

var viewmore_offset = 0;

function viewmore(){
    viewmore_offset += 10;
    url = '/api/load?';
    url += 'offset=' + viewmore_offset + '&';
    renderTable();
}

function detailview(data){
    window.location.href = '/detail?ticketid='+data;
}

// getUrlParameter('post'); // "1234"
// getUrlParameter('action'); // "edit"




const table = document.getElementById('commentstable');
var url = '/api/loadById?ticketId=';

var ticketid = getUrlParameter('ticketid');
// var limit = getUrlParameter('limit');
// var sort = getUrlParameter('sort');
// var direction = getUrlParameter('direction');
// var filter = getUrlParameter('filter');
// var search = getUrlParameter('search');

url +=ticketid;

// if (url.includes('?'))
// {
// }else{
//     url +='?';
// }

// if (offset!=null && offset!='' && offset !=' ') {
//     // if (url.includes('offset')){
//     // }
//     ////Ok, so problem in the future is having more than one offset/whatever in url
//     ////not a problem now since the url does not persist
//     url +='offset='+offset+'&';
// }

// if (limit!=null && limit!='' && limit !=' ') {
//     url +='limit='+limit+'&';
// }

// if (sort!=null && sort!='' && sort !=' ') {
//     url +='sort='+sort+'&';
// }

// if (direction!=null && direction!='' && direction !=' ') {
//     url +='direction='+direction+'&';
// }

// if (filter!=null && filter!='' && filter !=' ') {
//     url +='filter='+filter+'&';
// }

// if (search!=null && search!='' && search !=' ') {
//     url +='search='+search+'&';
// }

renderTable();

