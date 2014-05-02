'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),<% if (usePassport) { %>}
	User = mongoose.model('User'),<% } %>
	<%= classifiedModelName %> = mongoose.model('<%= classifiedModelName %>');

/**
 * Globals
 */
var <%= camelizedModelName %>;
<% if (usePassport) { %>var user;<% } %>

/**
 * Unit tests
 */
describe('<%= humanizedModelName %> Model Unit Tests:', function() {
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
			<%= camelizedModelName %> = new <%= classifiedModelName %> ({
				// Add model fields
				// ...
			});

			done();
<% if (usePassport) { %>});<% } %>
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return <%=camelizedModelName %>.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		<%= classifiedModelName %>.remove().exec();
<% if (usePassport) { %>User.remove().exec();<% } %>
		done();
	});
});