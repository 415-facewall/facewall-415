'use strict';

var app = app || {};

(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Person(personInfo) {
    this.employee_id = personInfo.employee_id;
    this.first_name = personInfo.first_name;
    this.last_name = personInfo.last_name;
    this.city = personInfo.city;
    this.img_url = personInfo.img_url;
    this.email = personInfo.email;
    this.github_profile = personInfo.github_profile;
    this.spotify_profile = personInfo.spotify_profile;
    this.role = [personInfo.job_title + ' at ' + personInfo.name];
    this.company = [personInfo.name];
  }

  Person.prototype.toHtml = function () {
    return app.render('employee-list-template', this);
  }

  Person.prototype.detailToHtml = function () {
    return app.render('employee-single-template', this);
  }

  const all = [];
  Person.getAll = () => all;

  module.getPersonArray = function () {
    all.forEach(person => console.log(person));
  }

  const loadAll = rows => {
    all.length = 0;
    rows.forEach(row => {
      let foundPerson = all.find(function (person) {
        return person.employee_id === row.employee_id;
      });
      if (!foundPerson) {
        all.push(new Person(row));
      } else {
        foundPerson.role.push(row.job_title + ' at ' + row.name);
        foundPerson.company.push(row.name);
      }
    });
    all.sort(function(a, b){
      let keyA = a.last_name, keyB = b.last_name;
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
    });
  }

  Person.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/employee`)
      .then(loadAll)
      .then(callback)
      .catch(errorCallback);

  Person.fetchOne = (employee_id, callback) => {
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/employee/${employee_id}`)
      .then(personData => callback(new Person(personData[0])))
      .catch(errorCallback);
  }
    

  module.Person = Person;
})(app)