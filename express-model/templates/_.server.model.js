'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * <%= classifiedModelName %> Schema
 */
var <%= classifiedModelName %>Schema = new Schema({
  // <%= classifiedModelName %> model fields
  // ...
});

mongoose.model('<%= classifiedModelName %>', <%= classifiedModelName %>Schema);
