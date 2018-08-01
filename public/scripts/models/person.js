'use strict';

var app = app || {};

(function (module){
  module.Person = Person;

  function errorCallback(err){
    console.error(err);
    app.errorView.initErrorPage(err);
  }

  function Person(personInfo){
    Object.keys(personInfo).forEach(key => this[key]=personInfo[key]);
  }

  Person.prototype.toHtml = function(){
    return app.render('employee-list-template', this)
  }

  Person.prototype.toDetailHtml = function(){
    return app.render('detail-overlay-template', this);
  }
  

  Person.all = [];
  Person.loadAll = rows => Person.all = rows.map(person => new Person(person));
  Person.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/employee`)
      .then(Person.loadAll)
      .then(callback)
      .catch(errorCallback);

  Person.fetchOne = (employee_id, callback) =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/employee/${employee_id}`)
      .then(Person.loadAll)
      .then(() => callback(Person.all[employee_id-1]))
      .catch(errorCallback);
})(app)