'use strict';

module.exports = function(app) {
<% if (usePassport) { %>	var users = require('../../app/controllers/users');
<% } %>	var <%= camelizedPluralName %> = require('../../app/controllers/<%= slugifiedPluralName %>');

	// <%= humanizedPluralName %> Routes
	app.route('/<%= slugifiedPluralName %>')
		.get(<%= camelizedPluralName %>.list)
		.post(<% if (usePassport) { %>users.requiresLogin, <% } %><%= camelizedPluralName %>.create);
	
	app.route('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id')
		.get(<%= camelizedPluralName %>.read)
		.put(<% if (usePassport) { %>users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <% } %><%= camelizedPluralName %>.update)
	    .delete(<% if (usePassport) { %>users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <% } %><%= camelizedPluralName %>.delete);

	// Finish by binding the <%= humanizedSingularName %> middleware
	app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);
};