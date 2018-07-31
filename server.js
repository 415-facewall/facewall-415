'use strict';

// Application dependencies
const express = require('express');
const superagent = require('superagent');
const requestProxy = require('express-request-proxy');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Database Setup
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', error => console.log(error));



app.get('/api/v1/employee',(req, res, next)=>{
  // let SQL = `SELECT e.first_name, e.last_name, e.city, e.img_url, e.email, e.github_profile, e.spotify_profile, c.name, r.job_title, r.date_started, r.date_ended
  // FROM employee_role r
  // INNER JOIN employee e ON e.employee_id = r.employee_id
  // INNER JOIN company c ON c.company_id = r.company_id`;
  //let SQL = `SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`;
  let SQL = `SELECT * FROM employee`;

  console.log(SQL);
  client.query(SQL)
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});

// Application Middleware


// API Endpoints
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

//Spotify API Endpoints
app.get('/api/v1/users/:user_id', (req, res) => {
  let url = 'https://accounts.spotify.com/api/token'
  var our_access_token;
  superagent.post(url)
    .send('grant_type=client_credentials')
    .auth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
    .then(result => result.body.access_token)
    .then(access_token =>{
      our_access_token = access_token;
      return superagent.get(`https://api.spotify.com/v1/users/${req.params.user_id}/playlists`)
        .set('Authorization', `Bearer ${access_token}`);
    })
    .then(result =>
      superagent.get(result.body.items[1].tracks.href)
        .set('Authorization', `Bearer ${our_access_token}`)
    )
    .then(result =>{
      //console.log(result.body.items[1].track_name);
      let tracks = result.body.items.map(item => item.track)
      return res.send(tracks);}
    );
})

app.get('/api/github/users/:id', (req, res) => {
  let user = req.params.id;
  let proxy = requestProxy({
    url: `https://api.github.com/users/${user}`,
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });
  proxy(req, res);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});