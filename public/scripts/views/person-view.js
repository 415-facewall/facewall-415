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
    app.showOnly('.employee-view');
    app.Person.getAll().forEach(person => $('.employee-view').append(person.toHtml()));
    personView.populateFilters();
    personView.handleCompanyFilter();
  }

  personView.initDetailPage = person => {
    app.showOnly('.person-detail');
    $('#person-detail').empty().append(person.detailToHtml());
  }

  personView.initTrackView = (person) => {
    personView.initIndexPage();
    personView.initDetailPage(person);
    app.Track.all.forEach(track => $('#person-detail tbody').append(track.toTrackHtml()));
  }

  

})(app)