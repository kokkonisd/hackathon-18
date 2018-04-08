console.log("[IoT Home Server is starting]");

var express = require('express');
var hbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var unzip = require('unzip');
var spawn = require("child_process").spawn;
var pythonshell = require('python-shell');
var rimraf = require('rimraf');
var ipmodule = require('ip');

app.use(session({
  secret: "yPyL2j6hHCGKfUQ38plS3NiooCjsszD9a1kVGD4feFJMzUnb9sHt1EePrMPDKQNr",
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var myapps = JSON.parse(fs.readFileSync("apps/myapps.json"));
var listeners = {};
var waitingNewObjects = [];

var utils = require('./js/utils')(http, fs, myapps, unzip, pythonshell, spawn, io, listeners, waitingNewObjects, rimraf);
var externalRoutes = require('./js/routes')(app, myapps, utils, pythonshell, spawn, listeners, io, waitingNewObjects, ipmodule);
var communicator = require('./js/communicator')(app, io, utils);

app.use(express.static(__dirname + '/node_modules'))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + 'views/layouts/'}));
app.set('view engine', 'hbs')

server.listen(5000);
