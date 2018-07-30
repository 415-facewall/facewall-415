'use strict';

// Application dependencies
const express = require('express');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET


// Database Setup


// Application Middleware


// API Endpoints
app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: '.'});
});

app.use(express.static('./public'));

//Spotify API Endpoints
app.get('/api/v1/users/:user_id', (req, res)=>{
  let url = 'https://accounts.spotify.com/api/token'
  superagent.post(url)
    .send('grant_type=client_credentials')
    .auth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
    .then(result => result.body.access_token)
    .then(access_token =>
      superagent.get(`https://api.spotify.com/v1/users/${req.params.user_id}`)
        .set('Authorization', `Bearer ${access_token}`))
    .then(result =>
      res.send(result.body)
    );
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));