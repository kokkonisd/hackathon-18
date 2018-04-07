module.exports = function(appList) {
    return {
      search: function(query) {
        var ret = [];

        appList.forEach(function(application) {
          var compteur = 0;
          if(application.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(query.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())) {
            ret.push(application);

            if(compteur >= 50)
               return ret;
          }
        });
        return ret;
      },

      exists: function(query) {
        var existe = false;
        appList.forEach(function(application) {
          if(application.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() === query.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) {
            existe = true;
          }
        });
        return existe;
      }
    }
}
