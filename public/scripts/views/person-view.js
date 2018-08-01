'use strict';
var app = app || {};

(function (module){
  const personView = {};
  module.personView = personView;

  personView.initIndexPage = () => {
    $('.employee-view').empty();
    app.showOnly('.employee-view');
    app.Person.all.forEach(person => $('.employee-view').append(person.toHtml()));
  }

  personView.initDetailView = (person) =>{
    $('#detail-overlay').empty();
    $('.detail-view').fadeIn();
    $('#detail-overlay').append(person.toHtml());
  }
})(app)