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
	// <%= classifiedName %> model fields   
	// ...
});

mongoose.model('<%= classifiedName %>', <%= classifiedName %>Schema);