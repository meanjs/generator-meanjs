'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * <%= _.capitalize(_.slugify(modelName)) %> Schema
 */
var <%= _.capitalize(_.slugify(modelName)) %>Schema = new Schema({
	
});

mongoose.model('<%= _.capitalize(_.slugify(modelName)) %>', <%= _.capitalize(_.slugify(modelName)) %>Schema);