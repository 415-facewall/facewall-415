'use strict';

// Application dependencies
const express = require('express');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;


// Database Setup


// Application Middleware


// API Endpoints
app.get('/test', (req, res) => res.send('hello world'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));