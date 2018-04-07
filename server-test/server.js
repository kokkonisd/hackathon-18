console.log("[Server is starting]");
// like an import statement
var express = require('express');
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
app.use(express.static('public'));

var spawn = require("child_process").spawn;

var PythonShell = require('python-shell');
app.get("/apps/:name", pyCb);
function loadAPIPage(req, res) {
    var name = req.params.name;
    var myPythonScriptPath = `../apps/${name}/main.py`;

    // Use python shell
    var pyshell = new PythonShell(myPythonScriptPath, { mode: "text", args: "html"});

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        console.log('finished sending page');
        renderAPIPage();
    });
}

function renderAPIPage() {
    fs.readFile("view.html", function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}