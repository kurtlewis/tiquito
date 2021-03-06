function createNode(element){
    return document.createElement(element);
}

function append(parent, el){
    return parent.appendChild(el);
}

const ul = document.getElementById('items');
const url = '/api/load';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    let items = data;
    return items.map(function(item){
        let li = createNode('li'),
            // img = createNode('img'),
            span = createNode('span');
        // span.innerHTML = '${item.firstname}';
        // img.src = item.picture.medium;
        span.innerHTML = `${item.creator.firstName}`
        // append(li, img);
        append(li, span);
        append(ul,li);
    })
})
.catch(function(error){
    console.log(error);
})

