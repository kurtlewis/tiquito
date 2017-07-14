var req = new XMLHttpRequest();
req.open('GET', "http://test.tiquito.com/api/load", true);
req.onreadystatechange = function(e) {
    if (this.readyState == 4) {
        var res = JSON.parse(req.responseText);
        console.log(res);
        var table = document.getElementById("res");
        res.map(function(obj) {
            var row = table.insertRow();
            row.id = obj._id;
            var title = row.insertCell();
            var tags = row.insertCell();
            var status = row.insertCell();
            console.log(obj);
            title.innerHTML = obj.problemTitle;
            tags.innerHTML = obj.Tags;
            status.innerHTML = obj.status;
            row.onClick = function() {
                // Find ticket from array, display it.
            }
        });
    }
}
req.send();