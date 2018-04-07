module.exports = function(app, myapps, utils, pythonshell, spawn, listeners, io, waitingNewObjects) {

  function alreadyContains(devices, deviceName) {
    for(var key in devices) {
      if(devices[key].name == deviceName)
        return true;
    }
    return false;
  }

  function getMyObjects() {
    var objets = [];
    for(var keysignal in listeners) {
      for(var i = 0; i < listeners[keysignal].length; i++) {
        if(!alreadyContains(objets, listeners[keysignal][i].name))
          objets.push(listeners[keysignal][i]);
      }
    }
    return objets;
  }

  function processNewObjectsForDisplay() {
    var ret = [];

    for(var key in waitingNewObjects) {
      ret.push({name: waitingNewObjects[key].name, ip: waitingNewObjects[key].ip, listens: waitingNewObjects[key].listen});
    }
    return ret;
  }

  function getLogin(req, res) {
    res.render('login.hbs');
  };

  app.get('/', function(req, res) {
    getLogin(req, res);
  });

  app.post('/index', function(req, res) {
    req.session.login = req.body.login;
    res.render('index.hbs', {username: req.session.login, myapps: myapps});
  });

  app.get('/index', function(req, res) {
    if(req.session.login == undefined)
      res.render('index.hbs', {username: "Not logged in", myapps: myapps});
    else
      res.render('index.hbs', {username: req.session.login, myapps: myapps});
  });

  app.post('/store', function(req, res) {
    req.session.login = req.body.login;
    var callback = function(body) {
      res.render('store.hbs', {username: req.session.login, availableApps: body});
    }
    utils.searchApps("", callback);
  });

  app.get('/store', function(req, res) {
    if(req.session.login == undefined) {
      var callback = function(body) {
        res.render('store.hbs', {username: "Not logged in", availableApps: body});
      }
      utils.searchApps("", callback);
    }
    else {
      var callback = function(body) {
        res.render('store.hbs', {username: req.session.login, availableApps: body});
      }
      utils.searchApps("", callback);
    }
  });

  app.post('/objects', function(req, res) {
    req.session.login = req.body.login;
    var callback = function(body) {
      res.render('objects.hbs', {username: req.session.login, myobjects: getMyObjects(), newobjects: processNewObjectsForDisplay()});
    }
    utils.searchApps("", callback);
  });

  app.get('/objects', function(req, res) {
    if(req.session.login == undefined) {
      var callback = function(body) {
        res.render('objects.hbs', {username: "Not logged in", myobjects: getMyObjects(), newobjects: processNewObjectsForDisplay()});
      }
      utils.searchApps("", callback);
    }
    else {
      var callback = function(body) {
        res.render('objects.hbs', {username: req.session.login, myobjects: getMyObjects(), newobjects: processNewObjectsForDisplay()});
      }
      utils.searchApps("", callback);
    }
  });


  app.get("/apps/:name", function(req, res) {
      var name = req.params.name;
      var scriptPath = `../apps/${name}/main.py`;

      // Use python shell
      var pyshell = new pythonshell(scriptPath, { mode: "text", args: "html"});

      // end the input stream and allow the process to exit
      pyshell.end(function (err) {
          if (err) throw err;

          fs.readFile(`apps/${name}/vue.html`, function (err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.end();
          });
      });
  });

  app.get("/run/:name/:args", function(req, res) {
    var name = req.params.name;
    var args = req.params.args;
    var scriptPath = `../apps/${name}/main.py`;

    console.log(`python3 ${scriptPath} ${args}`);

    var pyshell = new pythonshell(scriptPath, { mode: "text", args: args});

    pyshell.end(function (err) {
        if (err) throw err;
        res.end();
    });
  });

  app.get("/listenrequest/", function(req, res) {
    var name = req.query.devicename;
    var signal = req.query.signal;
    var type = req.query.type;
    var ip = req.connection.remoteAddress;

    waitingNewObjects.push({name: name, type: type, ip: ip, listens: signal});
    io.emit('addRefreshNewObjects', waitingNewObjects);

    res.send("Done.");
  });

  app.get("/getdeviceip/", function(req, res) {
    var name = req.query.devicename;

    for(var signal in listeners) {
      for(var i = 0; i < listeners[signal].length; i++) {
        if(listeners[signal][i].name == name)
          res.write(listeners[signal][i].ip);
      }
    }
    res.send("");
  });

  app.get("/getalloftype/", function(req, res) {
    var type = req.query.type;
    var allOfType = [];

    for(var signal in listeners) {
      for(var i = 0; i < listeners[signal].length; i++) {
        if(listeners[signal][i].type == type && !alreadyContains(allOfType, listeners[signal][i].name))
          allOfType.push(listeners[signal][i]);
      }
    }
    res.json(allOfType);
  });

  app.get("/getlistenersof/", function(req, res) {
    res.json(listeners[req.query.signal]);
  });

}
