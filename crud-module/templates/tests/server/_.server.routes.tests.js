'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, <%= camelizedSingularName %>;

/**
 * <%= humanizedSingularName %> routes tests
 */
describe('<%= humanizedSingularName %> CRUD tests', function() {
  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function(done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'password'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new <%= humanizedSingularName %>
    user.save(function() {
      <%= camelizedSingularName %> = {
        name: '<%= humanizedSingularName %> Name'
      };

      done();
    });
  });

  it('should be able to save <%= humanizedSingularName %> instance if logged in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) done(signinErr);

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= slugifiedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function(<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= humanizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) done(<%= camelizedSingularName %>SaveErr);

            // Get a list of <%= humanizedPluralName %>
            agent.get('/api/<%= slugifiedPluralName %>')
              .end(function(<%= camelizedPluralName %>GetErr, <%= camelizedPluralName %>GetRes) {
                // Handle <%= humanizedSingularName %> save error
                if (<%= camelizedPluralName %>GetErr) done(<%= camelizedPluralName %>GetErr);

                // Get <%= humanizedPluralName %> list
                var <%= camelizedPluralName %> = <%= camelizedPluralName %>GetRes.body;

                // Set assertions
                (<%= camelizedPluralName %>[0].user._id).should.equal(userId);
                (<%= camelizedPluralName %>[0].name).should.match('<%= humanizedSingularName %> Name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save <%= humanizedSingularName %> instance if not logged in', function(done) {
    agent.post('/api/<%= slugifiedPluralName %>')
      .send(<%= camelizedSingularName %>)
      .expect(403)
      .end(function(<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
        // Call the assertion callback
        done(<%= camelizedSingularName %>SaveErr);
      });
  });

  it('should not be able to save <%= humanizedSingularName %> instance if no name is provided', function(done) {
    // Invalidate name field
    <%= camelizedSingularName %>.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) done(signinErr);

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= slugifiedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(400)
          .end(function(<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Set message assertion
            (<%= camelizedSingularName %>SaveRes.body.message).should.match('Please fill <%= humanizedSingularName %> name');

            // Handle <%= humanizedSingularName %> save error
            done(<%= camelizedSingularName %>SaveErr);
          });
      });
  });

  it('should be able to update <%= humanizedSingularName %> instance if signed in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) done(signinErr);

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= slugifiedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function(<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= humanizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) done(<%= camelizedSingularName %>SaveErr);

            // Update <%= humanizedSingularName %> name
            <%= camelizedSingularName %>.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update existing <%= humanizedSingularName %>
            agent.put('/api/<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
              .send(<%= camelizedSingularName %>)
              .expect(200)
              .end(function(<%= camelizedSingularName %>UpdateErr, <%= camelizedSingularName %>UpdateRes) {
                // Handle <%= humanizedSingularName %> update error
                if (<%= camelizedSingularName %>UpdateErr) done(<%= camelizedSingularName %>UpdateErr);

                // Set assertions
                (<%= camelizedSingularName %>UpdateRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);
                (<%= camelizedSingularName %>UpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of <%= humanizedPluralName %> if not signed in', function(done) {
    // Create new <%= humanizedSingularName %> model instance
    var <%= camelizedSingularName %>Obj = new <%= classifiedSingularName %>(<%= camelizedSingularName %>);

    // Save the <%= humanizedSingularName %>
    <%= camelizedSingularName %>Obj.save(function() {
      // Request <%= humanizedPluralName %>
      request(app).get('/api/<%= slugifiedPluralName %>')
        .end(function(req, res) {
          // Set assertion
          res.body.should.be.an.Array.with.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });


  it('should be able to get a single <%= humanizedSingularName %> if not signed in', function(done) {
    // Create new <%= humanizedSingularName %> model instance
    var <%= camelizedSingularName %>Obj = new <%= classifiedSingularName %>(<%= camelizedSingularName %>);

    // Save the <%= humanizedSingularName %>
    <%= camelizedSingularName %>Obj.save(function() {
      request(app).get('/api/<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>Obj._id)
        .end(function(req, res) {
          // Set assertion
          res.body.should.be.an.Object.with.property('name', <%= camelizedSingularName %>.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to delete <%= humanizedSingularName %> instance if signed in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) done(signinErr);

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= slugifiedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function(<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= humanizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) done(<%= camelizedSingularName %>SaveErr);

            // Delete existing <%= humanizedSingularName %>
            agent.delete('/api/<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
              .send(<%= camelizedSingularName %>)
              .expect(200)
              .end(function(<%= camelizedSingularName %>DeleteErr, <%= camelizedSingularName %>DeleteRes) {
                // Handle <%= humanizedSingularName %> error error
                if (<%= camelizedSingularName %>DeleteErr) done(<%= camelizedSingularName %>DeleteErr);

                // Set assertions
                (<%= camelizedSingularName %>DeleteRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete <%= humanizedSingularName %> instance if not signed in', function(done) {
    // Set <%= humanizedSingularName %> user
    <%= camelizedSingularName %>.user = user;

    // Create new <%= humanizedSingularName %> model instance
    var <%= camelizedSingularName %>Obj = new <%= classifiedSingularName %>(<%= camelizedSingularName %>);

    // Save the <%= humanizedSingularName %>
    <%= camelizedSingularName %>Obj.save(function() {
      // Try deleting <%= humanizedSingularName %>
      request(app).delete('/api/<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>Obj._id)
      .expect(403)
      .end(function(<%= camelizedSingularName %>DeleteErr, <%= camelizedSingularName %>DeleteRes) {
        // Set message assertion
        (<%= camelizedSingularName %>DeleteRes.body.message).should.match('User is not authorized');

        // Handle <%= humanizedSingularName %> error error
        done(<%= camelizedSingularName %>DeleteErr);
      });

    });
  });

  afterEach(function(done) {
    User.remove().exec(function(){
      <%= classifiedSingularName %>.remove().exec(function(){
        done();
      });
    });
  });
});
