'use strict';
var app = app || {};

(function (module) {
  const personView = {};
  module.personView = personView;

  personView.populateFilters = () => {
    let companies = [];
    $('.employee').each(function () {
      let role_company = $(this).find('.role-company');
      for (let i = 0; i < role_company.length; i++) {
        let val = role_company[i].textContent;
        let company = val.substring(val.indexOf(' at ') + 4);
        if (!companies.includes(company)) {
          companies.push(company);
        }
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
        $('.employee').hide();
        $(`.employee[data-company*="${$(this).val()}"]`).fadeIn();
      } else {
        $('.employee').fadeIn();
      }
      $('#company-filter').val('');
    });
  };

  personView.initIndexPage = () => {
    $('.employee-view').empty();
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