console.log("[Server is starting]");
// like an import statement
var express = require('express');
var fs = require('fs');
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

app.get("/apps/:name", loadAPIPage);
function loadAPIPage(req, res) {
    console.log('loading API');
    var name = req.params.name;
    var scriptPath = `../apps/${name}/main.py`;

    // Use python shell
    var pyshell = new PythonShell(scriptPath, { mode: "text", args: "html"});

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err) throw err;

        fs.readFile(`../apps/${name}/vue.html`, function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            console.log('finished sending page');
            res.end();
        });
    });
}

app.get("/run/:name/:args", runPythonScript);
function runPythonScript(req, res) {
    var name = req.params.name;
    var args = req.params.args;
    var scriptPath = `../apps/${name}/main.py`;

    console.log(`python3 ${scriptPath} ${args}`);

    var pyshell = new PythonShell(scriptPath, { mode: "text", args: args});

    pyshell.end(function (err) {
        if (err) throw err;

        res.end();
    });
}
