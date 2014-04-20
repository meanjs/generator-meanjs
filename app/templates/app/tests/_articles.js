'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),<% if (usePassport) { %>
	User = mongoose.model('User'),<% } %>
	Article = mongoose.model('Article');

/**
 * Globals
 */
var article;
<% if (usePassport) { %>var user;<% } %>

/**
 * Unit tests
 */
describe('Article Model Unit Tests:', function() {
	beforeEach(function(done) {<% if (usePassport) { %>
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {<% } %>
			article = new Article({
				title: 'Article Title',
				content: 'Article Content'<% if (usePassport) { %>,
				user: user<% } %>
			});

			done();
<% if (usePassport) { %>		});<% } %>
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return article.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			article.title = '';

			return article.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Article.remove().exec();<% if (usePassport) { %>
		User.remove().exec();<% } %>
		done();
	});
});