'use strict';

var app = app || {};

(function (module) {
  let productionApiUrl = 'https://facewall-415.herokuapp.com';
  let developmentApiUrl = 'http://localhost:3000';

  module.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

  module.ENVIRONMENT = {
    apiUrl: module.isProduction ? productionApiUrl : developmentApiUrl,
  };

})(app);

$(document).ready(function() {
  $('.hamburger-menu').on('mouseenter', function(){
    $('.top-nav-items').removeClass('hidden');
  });
  $('.hamburger-menu').on('click', function(){
    $('.top-nav-items').toggleClass('hidden');
  });
  $('.top-nav-items').on('mouseleave', function() {
    $(this).addClass('hidden');
  });
});