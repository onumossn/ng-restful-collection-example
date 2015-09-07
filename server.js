'use strict';
/**
 * Module dependencies.
 */
var express = require('express'),
  mongoose = require('mongoose'),
	chalk = require('chalk'),
  config = {
    db: 'mongodb://localhost/quick-todo-dev',
    port: 3000
  };


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = express();

app = require('./public/server/express')(app),
app = require('./app/server/express')(app, db);

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Application started on port ' + config.port);