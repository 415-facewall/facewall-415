'use strict';

var app = app || {};

(function (module){
  module.Track = Track;

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Track(trackInfo){
    Object.keys(trackInfo).forEach(key=> this[key]=trackInfo[key]);
  }

  Track.prototype.toTrackHtml = function(){
    return app.render('spotify-template', this)
  }

  Track.all = [];
  Track.loadAll = rows => Track.all = rows.map(track => new Track(track));
  Track.fetchPlaylists = (user_id, employee_id, callback) => 
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/employee/${employee_id}/${user_id}`)
      .then(Track.loadAll)
      .then(()=> callback(app.Person.all[employee_id-1]))
      .catch(errorCallback);

})(app)