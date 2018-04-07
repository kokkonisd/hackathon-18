module.exports = function(app, appManager) {

  app.get('/search/', function(req, res) {
    var results = appManager.search(req.query.name);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });

  app.get('/download/', function(req, res) {
    if(!appManager.exists(req.query.name)) {
      console.log("Does not exist.");
      res.status(404).send('Not found');
      return;
    }

    console.log("Want to download: " + req.query.name);

    var file = 'apps/' + req.query.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(" ", "_") + '.zip';
    res.download(file);
  });
}
