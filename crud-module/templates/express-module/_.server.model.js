'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * <%= humanizedSingularName %> Schema
 */
var <%= classifiedSingularName %>Schema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill <%= humanizedSingularName %> name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
<% if (usePassport) { %>	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
<% } %>	}
});

mongoose.model('<%= classifiedSingularName %>', <%= classifiedSingularName %>Schema);