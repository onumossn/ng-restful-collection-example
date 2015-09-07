'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var TodoSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Title is required.'
  },
  description: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Todo', TodoSchema);