'use strict';

var app = app || {};

(function (module){
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Track(trackInfo){
    Object.keys(trackInfo).forEach(key=> this[key]=trackInfo[key]);
  }

  Track.prototype.toHtml = function(){
    return app.render('spotify-template', this)
  }

  Track.all = [];
  Track.loadAll = rows => Track.all = rows.map(track => new Track(track));
  Track.fetchAll4One = (user_id, callback) => 
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/users/${user_id}`)
      .then(Track.loadAll)
      .then(callback)
      .catch(errorCallback);

})(app)