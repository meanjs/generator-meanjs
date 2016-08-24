'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>');

/**
 * Globals
 */
var user,
  <%= camelizedSingularName %>;

/**
 * Unit tests
 */
describe('<%= humanizedSingularName %> Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      <%= camelizedSingularName %> = new <%= classifiedSingularName %>({
        name: '<%= humanizedSingularName %> Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return <%=camelizedSingularName %>.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      <%= camelizedSingularName %>.name = '';

      return <%=camelizedSingularName %>.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    <%= classifiedSingularName %>.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
