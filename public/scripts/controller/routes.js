'use strict';

page('/'
  , () => app.Person.fetchAll(app.personView.initIndexPage)

);

page('/employee/:employee_id'
  , ctx => app.Person.fetchOne(ctx.params.employee_id, app.personView.initDetailView)
);

page('/about'
  , ctx => app.personView.initAboutPage(ctx)
);

page('/employee/:employee_id/:user_id', ctx =>{console.log(ctx.params.user_id); app.Track.fetchPlaylists(ctx.params.user_id, ctx.params.employee_id, app.personView.initTrackView)}
);



page();