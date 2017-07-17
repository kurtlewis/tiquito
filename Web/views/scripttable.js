function createNode(element){
    return document.createElement(element);
}

function append(parent, el){
    return parent.appendChild(el);
}

// var div = document.createElement("div");
// div.style.width = "100px";
// div.style.height = "100px";
// div.style.background = "red";
// div.style.color = "white";
// div.innerHTML = "Hello";

// document.body.appendChild(div);

const table = document.getElementById('listItems');
const url = '/api/load';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    let listItems = data;
    return listItems.map(function(listItem){
        let tr = createNode('tr'),
            problemtitle = createNode('td'),
            tags = createNode('td'),
            ticketstatus = createNode('td');
            buttonlink = createNode('button');
        // span.innerHTML = '${item.firstname}';
        // img.src = item.picture.medium;
        buttonlink.innerHTML = "View";
        problemtitle.innerHTML = `${listItem.problemTitle}`;
        tags.innerHTML = `${listItem.Tags}`;
        ticketstatus.innerHTML = `${listItem.status}`;
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

