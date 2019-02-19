const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const errorhandler = require('errorhandler');
const env = process.env.NODE_ENV || 'development';
const cors = require('cors');
const config = require('./config/config')[env];
const port = config.app.port;

global.config = config;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    // configure generic reply parameters (CORS + caching)
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Cache-Control', 'no-cache');
  
    next();
});

const nodeDI  = require ('node-dependency-injection');
let container = new nodeDI.ContainerBuilder();
global.diContainer = container;

// define routers
var user    = require('./routes/user');
var profile = require('./routes/profile');
var team    = require('./routes/team');
var franchaisee = require('./routes/franchaisee');

// set up routers
app.use('/api/users', user);
app.use('/api/profile', profile);
app.use('/api/team', team);
app.use('/api/franchaisee', franchaisee);

let server = app.listen(port, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

module.exports = server;