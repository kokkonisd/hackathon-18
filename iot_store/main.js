var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');

function parseApps(appList) {
	results = [];

	appList.forEach(function(appEntry) {
		var nextApp = {};
		var substrings = appEntry.split('#');
		nextApp.name = substrings[0];
		nextApp.description = substrings[1];
		nextApp.rating = substrings[2];
		nextApp.version = substrings[3];
		for(attribut in nextApp) {
			nextApp[attribut] = nextApp[attribut].replace('\r', '');
			nextApp[attribut] = nextApp[attribut].replace('\n', '');
		}
		nextApp.rating = parseFloat(nextApp.rating);
		nextApp.version = parseFloat(nextApp.version);

		results.push(nextApp);
	});

	return results;
};

fs.readFile("apps/app_list.txt", 'utf-8', function(err, data) {
	if(err) throw err;
	var fileContents = data.split('$');

	appList = parseApps(fileContents);
	appList.sort(function(app1, app2) {
		return app1.name >= app2.name;
	})

  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

	var appManager = require('./js/appManager')(appList);
  var externalRoutes = require('./js/routes')(app, appManager);

  app.use(express.static(__dirname + '/node_modules'));

  server.listen(8080);
});
