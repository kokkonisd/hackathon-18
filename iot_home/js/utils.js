module.exports = function(http, fs, myapps, unzip, pythonshell, spawn, io, listeners, waitingNewObjects, rimraf, ipmodule) {

  const removeAlreadyPossessed = function(apps) {
    newapps = [];
    apps.forEach(function(application) {
      if(!alreadyPossess(application.name))
        newapps.push(application);
    });
    return newapps;
  };

  const alreadyPossess = function(name) {
    var existe = false;
    myapps.forEach(function(application) {
      if(application.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() === name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) {
        existe = true;
      }
    });
    return existe;
  };

  function removefrom(apps, appName) {
    for(var i = 0; i < apps.length; i++) {
      if(apps[i].name == appName) {
        apps.splice(i, 1);
        return;
      }
    }
  }

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


  return {
    searchApps: function(name, callBack) {
        http.get(`http://`+ipmodule.address()+`:8080/search/?name=${name}`, res => {
            res.setEncoding("utf8");
            var body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = removeAlreadyPossessed(JSON.parse(body));
                callBack(body);
            });
        });
    },

    downloadApp: function(application, callback) {
        var appName = application.name.toLowerCase();
        var file = fs.createWriteStream("apps/"+appName+".zip");
        var request = http.get(`http://`+ipmodule.address()+`:8080/download/?name=${appName}`, function(response) {
          rimraf('apps/'+application.name, function() {
            response.pipe(file);
          });
          callback();
          fs.mkdirSync('apps/'+appName);
          var stream = fs.createReadStream('apps/'+appName+".zip").pipe(unzip.Extract({ path: 'apps/'+appName }));
          stream.on('close', function() {
            fs.unlink('apps/'+appName+'.zip');
          });
        });
        myapps.push(application);
        fs.writeFile('apps/myapps.json', JSON.stringify(myapps), 'utf8', function() {
      });
    },

    acceptObject: function(name) {
      for(var i = 0; i < waitingNewObjects.length; i++) {
        if(name == waitingNewObjects[i].name) {
          var name = waitingNewObjects[i].name;
          var signal = waitingNewObjects[i].listens;
          var type = waitingNewObjects[i].type;
          var ip = waitingNewObjects[i].ip;

          if(listeners[signal] === undefined)
            listeners[signal] = [{name: name, type: type, ip: ip}];
          else
            listeners[signal].push({name: name, type: type, ip: ip});

          waitingNewObjects.splice(i, 1);
          io.sockets.emit('refreshMyObjects', getMyObjects());
          io.sockets.emit('refreshNewObjects', waitingNewObjects);
          return;
        }
      }
    },

    uninstallApp: function(name, client) {
      removefrom(myapps, name);
      rimraf('apps/'+name, function() {
      });
      client.emit('appUninstalled', myapps);
      fs.writeFile('apps/myapps.json', JSON.stringify(myapps), 'utf8', function() {
      });
    },

    launchPyWithArgs(name, args, res) {
      var scriptPath = `apps/${name}/main.py`;

      var pyshell = new pythonshell(scriptPath, { mode: "text", args: args});

      pyshell.end(function (err) {
          if (err) throw err;
          res.end();
      });
    },

    launchPyWithoutArgs(name, res) {
      var scriptPath = `apps/${name}/main.py`;

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
    }

}

}
