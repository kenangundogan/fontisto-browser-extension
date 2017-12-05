function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('fontisto.json', function (data) {

    var html = "<ul>";
        for (var i = 0; i < data["fontisto"]["icons"]["brand"].length; i++) {
            html += '<li>' + data["fontisto"]["icons"]["brand"][i]["name"] + "</li>";
        }
        html += "</ul>";
        document.getElementById("text").innerHTML = html;
});