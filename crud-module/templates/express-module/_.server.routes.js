'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var <%= camelizedPluralName %> = require('../../app/controllers/<%= slugifiedPluralName %>.server.controller');

	// <%= humanizedPluralName %> Routes
	app.route('/<%= slugifiedPluralName %>')
		.get(<%= camelizedPluralName %>.list)
		.post(users.requiresLogin, <%= camelizedPluralName %>.create);

	app.route('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id')
		.get(<%= camelizedPluralName %>.read)
		.put(users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.update)
		.delete(users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.delete);

	// Finish by binding the <%= humanizedSingularName %> middleware
	app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);
};
