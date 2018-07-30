'use strict';

var app = app || {};

(function (module) {
  let productionApiUrl = 'https://facewall-415.herokuapp.com';
  let developmentApiUrl = 'http://localhost:3000';

  module.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

  module.ENVIRONMENT = {
    apiUrl: module.isProduction ? productionApiUrl : developmentApiUrl,
  };

  console.log(module.ENVIRONMENT);

})(app);