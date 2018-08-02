'use strict';

var app = app || {};

(function (module) {
  let filters = [];

  function Filter (rawDataObj) {
    this.id = rawDataObj.id;
  }

  Filter.prototype.toHtml = function () {
    // return app.render('filter-template', this)
  }

  let rawFilterData = [{id: 'company'}];

  rawFilterData.forEach(filterObject => {
    filters.push(new Filter(filterObject));
  });

  filters.forEach(filter => {
    $('#filters').append(filter.toHtml());
  });

})(app)