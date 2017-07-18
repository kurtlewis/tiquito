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
.then(function(data) {
    let Titletable = data;
    return Titletable.map(function(titletable){
        let tr = createNode('tr'),
            problemtitle = createNode('td'),
            tags = createNode('td'),
            ticketstatus = createNode('td');
            buttonlink = createNode('button');
        // span.innerHTML = '${item.firstname}';
        // img.src = item.picture.medium;
        buttonlink.innerHTML = "View";
        buttonlink.addEventListener('click', function(){
            detailview(`${titletable._id}`);
        })
        // buttonlink.setAttribute('onclick','detailview();');
        // buttonlink.setAttribute('onclick',"detailview(\''+`${listItem._id}`+'\');");
        // buttonlink.onclick = "detailview(`${listItem._id}`);";
        // buttonlink.onclick = 'detailview(' + `${listItem._id}` + ');';
        problemtitle.innerHTML = `${titletable.problemTitle}`;
        tags.innerHTML = `${titletable.Tags}`; 
        ticketstatus.innerHTML = `${titletable.status}`;
        // append(li, img);
        append(tr, problemtitle);
        append(tr, tags);
        append(tr, ticketstatus);
        append(tr, buttonlink);
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

var viewmore_offset = 0;

function viewmore(){
    viewmore_offset += 10;
    url = '/api/load?';
    url += 'offset=' + viewmore_offset + '&';
    renderTable();
    div.innerHTML = viewmore_offset;
}

function detailview(data){
    div.innerHTML = data;
    window.location.href = '/detail?ticketid='+data;
}

// getUrlParameter('post'); // "1234"
// getUrlParameter('action'); // "edit"

var div = document.createElement("div");
div.style.width = "300px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = url;
document.body.appendChild(div);

const table = document.getElementById('Titletable');
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

