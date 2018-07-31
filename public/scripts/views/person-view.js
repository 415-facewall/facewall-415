'use strict';
var app = app || {};

(function (module){
  const personView = {};
  module.personView = personView;

  personView.initIndexPage = () => {
    $('#employees').empty();
    app.showOnly('.employee-view');
    app.Person.all.forEach(person => $('#employees').append(person.toHtml()));
  }

  personView.initDetailView = (person) =>{
    $('#detail-overlay').empty();
    $('.detail-view').fadeIn();
    $('#detail-overlay').append(person.toHtml());
  }
})(app)