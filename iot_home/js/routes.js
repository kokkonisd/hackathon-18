module.exports = function(app, myapps, utils) {

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

}
