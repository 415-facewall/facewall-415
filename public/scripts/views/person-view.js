'use strict';
var app = app || {};

(function (module) {
  const personView = {};
  module.personView = personView;

  personView.populateFilters = () => {
    let companies = [];
    $('.employee').each(function () {
      let role_company = $(this).attr('data-company');
      let prevLocationOfComma = 0;
      let locationOfComma = role_company.indexOf(',');
      while(locationOfComma > 0){
        let company = role_company.substring(prevLocationOfComma, locationOfComma);
        if (!companies.includes(company)) {
          companies.push(company);
        }
        prevLocationOfComma = locationOfComma + 1;
        locationOfComma = role_company.indexOf(',', locationOfComma + 1);
      }
    });
    companies.sort();
    companies.forEach(company => {
      let optionTag = `<option value="${company}">${company}</option>`;
      $('#company-filter').append(optionTag);
    });
  };

  personView.handleCompanyFilter = () => {
    $('#company-filter').on('change', function () {
      if ($(this).val()) {
        $('.employee').addClass('hidden');
        $(`.employee[data-company*="${$(this).val()}"]`).removeClass('hidden');
      } else {
        $('.employee').removeClass('hidden');
      }
    });
  };

  personView.initIndexPage = () => {
    $('.employee-view').empty();
    $('.filters, .search').show();
    $('.about-selector').hide();
    app.showOnly('.employee-view');
    app.Person.all.forEach(person => $('.employee-view').append(person.toHtml()));
    personView.populateFilters();
    personView.handleCompanyFilter();
  }

  personView.initDetailView = (person) => {
    personView.initIndexPage();
    $('#detail-overlay').empty();
    $('.error-view').hide();
    $('.detail-view').fadeIn();
    $('#detail-overlay').append(person.toDetailHtml());
  }

  personView.initTrackView = (person) => {
    personView.initIndexPage();
    personView.initDetailView(person);
    app.Track.all.forEach(track => $('#detail-overlay tbody').append(track.toTrackHtml()));
  }

  

})(app)