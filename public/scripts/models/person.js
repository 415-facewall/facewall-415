'use strict';

var app = app || {};

(function (module) {
  module.Person = Person;

  function errorCallback(err) {
    console.error(err);
    app.errorView.initErrorPage(err);
  }

  function Person(personInfo) {
    this.employee_id = personInfo.employee_id;
    this.first_name = personInfo.first_name;
    this.last_name = personInfo.last_name;
    this.img_url = personInfo.img_url;
    this.email = personInfo.email;
    this.github_profile = personInfo.github_profile;
    this.companies = [personInfo.name];
    this.roles = [personInfo.job_title];
  }

  module.getPersonArray = function () {
    Person.all.forEach(person => console.log(person));
  }

  Person.prototype.toHtml = function () {
    return app.render('employee-list-template', this)
  }

  Person.prototype.toDetailHtml = function () {
    return app.render('detail-overlay-template', this);
  }


  Person.all = [];

  Person.loadAll = function (rows) {
    rows.forEach(row => {
      let foundPerson = Person.all.find(function(person){
        return person.employee_id === row.employee_id;
      });
      if(!foundPerson) {
        Person.all.push(new Person(row));
      }
      else {
        foundPerson.companies.push(row.name);
        foundPerson.roles.push(row.job_title);
      }
    });
  }

  Person.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/employee`)
    .then(Person.loadAll)
    .then(callback)
    .catch(errorCallback);

  Person.fetchOne = (employee_id, callback) =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/employee/${employee_id}`)
    .then(Person.loadAll)
    .then(() => callback(Person.all[employee_id - 1]))
    .catch(errorCallback);
})(app)