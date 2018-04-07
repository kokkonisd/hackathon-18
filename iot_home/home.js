console.log("[IoT Home Server is starting]");
// like an import statement
var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
// initialize the app
var app = express();
// tell the app where to listen to
var listen_port = 5000;
//var server = app.listen(listen_port, listening);
// a simple callback to check that everything's working
/*
function listening() {
    console.log("[Listening at port " + listen_port + "]");
}
*/
// let's use some static html as the frontpage
//app.use(express.static('public'));

/*
app.use(bodyParser.urlencoded({ extended : false} ));
app.use(bodyParser.json());

var app_list = JSON.parse(fs.readFileSync("apps/apps.json"));

app.get("/apps/", listApps);
function listApps(request, response) {
    var reply = "App Name\tVersion\n";
    for (var key in app_list) {
        reply += app_list[key].name + "\t" + app_list[key].version + "\n";
    }
    console.log(reply);
    response.send(reply);
}
*/

function searchApps (name) {
    http.get(`http://localhost:8080/search/?name=${name}`, res => {
        res.setEncoding("utf8");
        var body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            console.log(body);
        });
    });
}

function downloadApp(name) {
    var file = fs.createWriteStream("apps/app.js");
    var request = http.get(`download/?name=${name}`, function(response) {
        response.pipe(file);
    });
}

<<<<<<< HEAD
searchApps("test");
=======
searchApps("enceinte");
>>>>>>> 438ca45b9b982ccf7bbc25d7c8acab1e8be3a474
