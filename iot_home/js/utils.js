module.exports = {
  searchApps: function(name) {
      http.get(`http://localhost:8080/search/${name}`, getAppList);
  },
  getAppList: function(data) {
      console.log(`====\nHere's the app list :\n----`);
      console.log(data);
      console.log("====");
  },
  downloadApp: function(name) {
      var file = fs.createWriteStream("apps/app.js");
      var request = http.get(`download/${name}`, function(response) {
          response.pipe(file);
      });
  }
}
