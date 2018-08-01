'use strict';

page('/'
  , () => app.Person.fetchAll(app.personView.initIndexPage)

);

page('/:person_id'
  , ctx => app.Person.fetchOne(ctx.params.person_id, app.personView.initDetailView)
);

page();