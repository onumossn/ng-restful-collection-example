'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	path = require('path');

module.exports = function(app, db) {
	require(path.resolve('./app/middleware/models/todo.model.js'));

	app.use(function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	  next();
	});


	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	require(path.resolve('./app/middleware/routes/todo.routes.js'))(app);

	return app;
};