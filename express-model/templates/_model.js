'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * <%= classifiedName %> Schema
 */
var <%= classifiedName %>Schema = new Schema({
	
});

mongoose.model('<%= classifiedName %>', <%= classifiedName %>Schema);