'use strict';

var app = app || {};
(function (module) {
  var errorView = {};
  module.errorView = errorView;

  errorView.initErrorPage = err =>{
    app.showOnly('.error-view');
    console.error(err);
  }

  errorView.errorCallback = err => {
    console.error(err);
    errorView.initErrorPage(err);
  }
})(app);