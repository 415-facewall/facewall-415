'use strict';

page('/'
  , () => app.Person.fetchAll(app.personView.initIndexPage)

);

page('/employee/:employee_id'
  , ctx => app.Person.fetchOne(ctx.params.employee_id, app.personView.initDetailView)
);

page();