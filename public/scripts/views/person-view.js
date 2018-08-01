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
    personView.initIndexPage();
    $('#detail-overlay').empty();
    $('.error-view').hide();
    $('.detail-view').fadeIn();
    $('#detail-overlay').append(person.toDetailHtml());
  }
})(app)