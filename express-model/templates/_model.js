'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * <%= _.capitalize(_.slugify(name)) %> Schema
 */
var <%= _.capitalize(_.slugify(name)) %>Schema = new Schema({
	
});

mongoose.model('<%= _.capitalize(_.slugify(name)) %>', <%= _.capitalize(_.slugify(name)) %>Schema);