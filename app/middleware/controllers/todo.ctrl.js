'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Todo = mongoose.model('Todo'),
  _ = require('lodash');

/**
 * Create a todo
 */
exports.create = function(req, res) {
  var todo = new Todo(req.body);

  todo.save(function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(todo);
    }
  });
};

/**
 * Show the current todo
 */
exports.read = function(req, res) {
  res.json(req.todo);
};

/**
 * Update a todo
 */
exports.update = function(req, res) {
  var todo = req.todo;

  todo = _.extend(todo, req.body);

  todo.save(function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(todo);
    }
  });
};

/**
 * Delete an todo
 */
exports.delete = function(req, res) {
  var todo = req.todo;

  todo.remove(function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(todo);
    }
  });
};

/**
 * List of todos
 */
exports.list = function(req, res) {
  var pageSize = 25,
   page = (req.params.page || 1) - 1;

  async.parallel({
    count: function(next) {
      Todo.count({}, next);
    },
    data: function(next) {
      Todo.find({}, next)
        .limit(pageSize)
        .skip(page * pageSize);
    }
  }, function(err, results) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json({
        data: results.data,
        page: page + 1,
        count: results.data.length,
        total: results.count
      });
    }
  });
};

/**
 * Todo middleware
 */
exports.todoByID = function(req, res, next, id) {
  Todo.findById(id).exec(function(err, todo) {
    if (err) return next(err);
    if (!todo) return next(new Error('Failed to load todo ' + id));
    req.todo = todo;
    next();
  });
};