'use strict';

/**
 * Module dependencies.
 */
var todo = require('../controllers/todo.ctrl');

module.exports = function(app) {
  // Todo Routes
  app.route('/todo')
    .get(todo.list)
    .post(todo.create);

  app.route('/todo/:todoId')
    .get(todo.read)
    .put(todo.update)
    .delete(todo.delete);

  // Finish by binding the todo middleware
  app.param('todoId', todo.todoByID);
};