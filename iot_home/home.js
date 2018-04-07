console.log("[IoT Home Server is starting]");
// like an import statement
var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
// initialize the app
var app = express();
// tell the app where to listen to
var listen_port = 8080;
var server = app.listen(listen_port, listening);
// a simple callback to check that everything's working
function listening() {
    console.log("[Listening at port " + listen_port + "]");
}
// let's use some static html as the frontpage
//app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended : false} ));
app.use(bodyParser.json());


function searchApps(name) {
    http.get('search/:name', getAppList);
}

function getAppList(data) {
    console.log(data);
}

function downloadApp(name) {
    var file = fs.createWriteStream("apps/app.js");
    var request = http.get(`download/${name}`, function(response) {
        response.pipe(file);
    });
}

searchApps(name);