'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var <%= camelizedPluralName %> = require('../../app/controllers/<%= slugifiedPluralName %>');

	// <%= humanizedPluralName %> Routes
	app.get('/<%= slugifiedPluralName %>', <%= camelizedPluralName %>.list);
	app.post('/<%= slugifiedPluralName %>', users.requiresLogin, <%= camelizedPluralName %>.create);
	app.get('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.read);
	app.put('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.update);
	app.del('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.delete);

	// Finish by binding the <%= humanizedSingularName %> middleware
	app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);
};