'use strict';

/**
 * Module dependencies.
 */
var	articles = require('../../app/controllers/articles');
<% if (usePassport) { %>var users = require('../../app/controllers/users');<% } %>

module.exports = function(app) {
	// Article Routes
	app.get('/articles', articles.list);<% if (usePassport) { %>
    app.post('/articles', users.requiresLogin, articles.create);<% } else { %>
	app.post('/articles', articles.create);<% } %>
    app.get('/articles/:articleId', articles.read);<% if (usePassport) { %>
    app.put('/articles/:articleId', users.requiresLogin, articles.hasAuthorization, articles.update);
    app.del('/articles/:articleId', users.requiresLogin, articles.hasAuthorization, articles.delete);<% } else { %>
	app.put('/articles/:articleId', articles.update);
	app.del('/articles/:articleId', articles.delete);<% } %>
    
	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};