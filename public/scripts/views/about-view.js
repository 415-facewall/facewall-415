'use strict';
var app = app || {};
(function(module){
  const aboutView = {};
  module.aboutView = aboutView;
  aboutView.initAboutPage = () =>{
    $('.filters, .search').hide();
    $('.about-selector').fadeIn();
    $('.employee-view').hide();
    $('.bio').hide();
    app.showOnly($('.about-view'));
  }
  aboutView.renderOne = (person) =>{
    aboutView.initAboutPage();
    $('.bio').hide();
    $('.selected').removeClass('selected');
    $(`#${person}`).fadeIn();
    $(`.${person}`).addClass('selected');
  }
})(app)