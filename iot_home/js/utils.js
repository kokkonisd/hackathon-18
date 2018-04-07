module.exports = function(http, fs, myapps, unzip) {

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


  return {
    searchApps: function(name, callBack) {
        http.get(`http://localhost:8080/search/?name=${name}`, res => {
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

    downloadApp: function(application, callback) { // TODO extraire le zip
        var appName = application.name.toLowerCase();
        var file = fs.createWriteStream("apps/"+appName+".zip");
        var request = http.get(`http://localhost:8080/download/?name=${appName}`, function(response) {
            response.pipe(file);
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

}

}
