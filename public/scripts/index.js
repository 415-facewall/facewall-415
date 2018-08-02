'use strict';

var app = app || {};

(function (module) {


  let productionApiUrl = 'https://facewall-415.herokuapp.com';
  let developmentApiUrl = 'http://localhost:3000';

  module.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

  module.ENVIRONMENT = {
    apiUrl: module.isProduction ? productionApiUrl : developmentApiUrl,
  };


  module.showOnly = (selector) => {
    $('.container').hide();
    $(selector).show();
  };

  module.render = (templateId, data) => {
    Handlebars.registerHelper('locateImage', img_url => {
      return img_url.substring(0, 4) === 'http' ? img_url : '/images/people/' + img_url;
    });
    Handlebars.registerHelper('hasEmail', email =>{
      return !email ? '' : ` <a href="mailto:${email}" class="icon-mail4"></a> `
    });
    Handlebars.registerHelper('hasGithub', github_profile =>{
      return !github_profile ? '' : ` <a href="https://github.com/${github_profile}" class="icon-github" target="_blank"></a> `
    });
    let template = Handlebars.compile($(`#${templateId}`).text());
    return template(data);
  };


})(app); //This closes the function module.


$(document).ready(function() {
  var win = $(this);
  $('.hamburger-menu').on('mouseenter', function(){
    $('.top-nav-items-mobile').css('display', 'block');
  });
  $('.hamburger-menu').on('click', function(){
    $('.top-nav-items-mobile').toggle();
  });
  $('.top-nav-items-mobile').on('mouseleave', function() {
    $('.top-nav-items-mobile').css('display', 'none');
  });
});


