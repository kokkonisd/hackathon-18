module.exports = function(app, io, utils) {

  io.on('connection', function(client) {
    client.on('searchApps', function(data) {
      client.emit('searchApps', searchApps(data));
    });

    client.on('downloadApp', function(data) {
      utils.downloadApp(data, function() {
        client.emit('appDownloaded', data.name);
      });
    });

    client.on('acceptNewObject', function(data) {
      utils.acceptObject(data);
    });

    client.on('uninstallApp', function(data) {
      utils.uninstallApp(data, client);
    });


  });

};
