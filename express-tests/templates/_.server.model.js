'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * <%= classifiedModelName %> Schema
 */
var <%= classifiedModelName %> Schema = new Schema({

});

mongoose.model('<%= classifiedModelName %>', <%= classifiedModelName %> Schema);
