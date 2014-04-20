'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),<% if (usePassport) { %>
	User = mongoose.model('User'),<% } %>
	<%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>');

/**
 * Globals
 */
var <%= camelizedSingularName %> ;
<% if (usePassport) { %>var user;<% } %>

/**
 * Unit tests
 */
describe('<%= humanizedSingularName %> Model Unit Tests:', function() {
	beforeEach(function(done) {<% if (usePassport) { %>
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { <% } %>
			<%= camelizedSingularName %> = new <%= classifiedSingularName %> ({
				name: '<%= humanizedSingularName %> Name'<% if (usePassport) { %>,
				user: user<% } %>
			});

			done();
		<% if (usePassport) { %>});<% } %>
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return <%=camelizedSingularName %> .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			<%= camelizedSingularName %> .name = '';

			return <%=camelizedSingularName %> .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		<%= classifiedSingularName %> .remove().exec();

<% if (usePassport) { %>		User.remove().exec();<% } %>
		done();
	});
});