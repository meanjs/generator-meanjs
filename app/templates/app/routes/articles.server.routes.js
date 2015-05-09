'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
  articles = require('../../app/controllers/articles');

module.exports = function(app) {
  // Article Routes
  app.route('/articles')
    .get(articles.list)
    .post(users.requiresLogin, articles.create);

  app.route('/articles/:articleId')
    .get(articles.read)
    .put(users.requiresLogin, articles.hasAuthorization, articles.update)
    .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
};