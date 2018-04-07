module.exports = function(app, io, utils) {

  // TODO appDownloaded, refreshStore

  io.on('connection', function(client) {
    client.on('searchApps', function(data) {
      console.log("Client searching "+data)
      client.emit('searchApps', searchApps(data));
    });

    client.on('downloadApp', function(data) {
      utils.downloadApp(data, function() {
        client.emit('appDownloaded', data.name);
      })
    });

  });

};
