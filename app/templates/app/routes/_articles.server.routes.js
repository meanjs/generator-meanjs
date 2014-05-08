'use strict';

/**
 * Module dependencies.
 */
<% if (usePassport) { %>var users = require('../../app/controllers/users');
<% } %>var	articles = require('../../app/controllers/articles');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(<% if (usePassport) { %>users.requiresLogin, <% } %>articles.create);
	
	app.route('/articles/:articleId')
		.get(articles.read)
		.put(<% if (usePassport) { %>users.requiresLogin, articles.hasAuthorization, <% } %>articles.update)
	    .delete(<% if (usePassport) { %>users.requiresLogin, articles.hasAuthorization, <% } %>articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};