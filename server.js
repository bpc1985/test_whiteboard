var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var server = require('http').createServer(app);

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

/////////////////////////// Database ////////////////////////////////
require('./server/config/mongoose')(config);

/////////////////////////// Passport ////////////////////////////////
require('./server/config/passport')();

/////////////////////////// Routes ////////////////////////////////
require('./server/config/routes')(app);

/////////////////////////// Socket ////////////////////////////////
require('./server/config/socket')(app, config);

/////////////////////////// Port ////////////////////////////////
//app.listen(config.port);
console.log("Listening on port " + config.port + '...');
