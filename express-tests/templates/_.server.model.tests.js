'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  <%= classifiedModelName %> = mongoose.model('<%= classifiedModelName %>');

/**
 * Globals
 */
var user, <%= camelizedModelName %>;

/**
 * Unit tests
 */
describe('<%= humanizedModelName %> Model Unit Tests:', function() {
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
      <%= camelizedModelName %> = new <%= classifiedModelName %>({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return <%= camelizedModelName %>.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    <%= classifiedModelName %>.remove().exec(function(){
      User.remove().exec(function(){
        done();
      });
    });
  });
});
