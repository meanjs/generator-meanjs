'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users');
var <%= camelizedPluralName %> = require('../../app/controllers/<%= slugifiedPluralName %>');

module.exports = function(app) {
	// <%= humanizedPluralName %> Routes, using express 4.x syntax
	app.route('/<%= slugifiedPluralName %>')
		.get(<%= camelizedPluralName %>.list)
		.post(users.requiresLogin, <%= camelizedPluralName %>.create);

	app.route('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id')
		.get(<%= camelizedPluralName %>.read)
		.put('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.update);
	app.del('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.delete);

	// Finish by binding the <%= humanizedSingularName %> middleware
	app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);
};