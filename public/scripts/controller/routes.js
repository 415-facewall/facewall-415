'use strict';

page('/', () => app.Person.fetchAll(app.personView.initIndexPage));

page('/employee/:employee_id', ctx => {
  app.Person.fetchOne(ctx.params.employee_id, app.personView.initDetailPage)
});

page('/about'
  , () => app.aboutView.initAboutPage()
);

page('/about/:name',
  ctx => app.aboutView.renderOne(ctx.params.name)
);

page('/employee/:employee_id/:user_id', ctx =>{
  app.Track.fetchPlaylists(ctx.params.user_id, ctx.params.employee_id, app.personView.initTrackView)}
);



page();