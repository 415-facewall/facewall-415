'use strict';
var app = app || {};

(function (module){
  const personView = {};
  module.personView = personView;

  personView.initIndexPage = () => {
    $('.employee-view').empty();
    $('.filters, .search').show();
    $('.about-selector').hide();
    app.showOnly('.employee-view');
    app.Person.all.forEach(person => $('.employee-view').append(person.toHtml()));
  }

  personView.initDetailView = (person) =>{
    personView.initIndexPage();
    $('#detail-overlay').empty();
    $('.error-view').hide();
    $('.detail-view').fadeIn();
    $('#detail-overlay').append(person.toDetailHtml());
  }

  personView.initTrackView = (person) =>{
    personView.initIndexPage();
    personView.initDetailView(person);
    app.Track.all.forEach(track => $('#detail-overlay tbody').append(track.toTrackHtml()));
  }

  

})(app)