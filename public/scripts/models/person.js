'use strict';

var app = app || {};

(function (module){
  module.Person = Person;

  function errorCallback(err){
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Person(personInfo){
    Object.keys(personInfo).forEach(key => this[key]=personInfo[key]);
  }

  Person.prototype.toHtml = function(){
    return app.render('employee-list-template', this)
  }

  Person.all = [];
  Person.loadAll = rows => Person.all = rows.map(person => new Person(person));
  Person.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/`)
      .then(Person.loadAll)
      .then(callback)
      .catch(errorCallback);

  Person.fetchOne = (person_id, callback) =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/${person_id}`)
      .then(results => callback(new Person(results)))
      .catch(errorCallback);
})(app)