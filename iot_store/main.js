var express = require('express');
var hbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(server);

fs.readFile("liste_pipots.txt", 'utf-8', function(err, data) {
	if(err) throw err;
	var pipots = data.split('\r\n');
	var sessionMiddleware = session({
    secret: "WM7MRjA7Q6D7yMYSfxgMP7XUz6hPthDvMMEMrTK6XXvVNelvpIpLYv5RCou7t0Ot",
    resave: false,
    saveUninitialized: true,
    cookie: {}
  });

	io.use(function(socket, next) {
			sessionMiddleware(socket.request, socket.request.res, next);
	});

  app.use(sessionMiddleware);

  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  var champions = [];

  function getChampionIndex(pseudo) {
    for(var i = 0; i < champions.length; i++) {
      if(champions[i].pseudo === pseudo)
        return i;
    }
    return -1;
  }

  pipots.sort();

  var externalRoutes = require('./js/routes')(app, pipots);
  var communicator = require('./js/communicator')(champions, io);

  app.use(express.static(__dirname + '/node_modules'));
  app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + 'views/layouts/'}));
  app.set('view engine', 'hbs')

  server.listen(8080);
});
