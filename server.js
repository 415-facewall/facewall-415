'use strict';

// Application dependencies
const express = require('express');
const superagent = require('superagent');
const requestProxy = require('express-request-proxy');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Database Setup


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