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
var app,
  agent,
  credentials,
  user,
  <%= camelizedSingularName %>;

/**
 * <%= humanizedSingularName %> routes tests
 */
describe('<%= humanizedSingularName %> CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
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
    user.save(function () {
      <%= camelizedSingularName %> = {
        name: '<%= humanizedSingularName %> name'
      };

      done();
    });
  });

  it('should be able to save a <%= humanizedSingularName %> if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= humanizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) {
              return done(<%= camelizedSingularName %>SaveErr);
            }

            // Get a list of <%= humanizedPluralName %>
            agent.get('/api/<%= camelizedPluralName %>')
              .end(function (<%= camelizedPluralName %>GetErr, <%= camelizedPluralName %>GetRes) {
                // Handle <%= humanizedPluralName %> save error
                if (<%= camelizedPluralName %>GetErr) {
                  return done(<%= camelizedPluralName %>GetErr);
                }

                // Get <%= humanizedPluralName %> list
                var <%= camelizedPluralName %> = <%= camelizedPluralName %>GetRes.body;

                // Set assertions
                (<%= camelizedPluralName %>[0].user._id).should.equal(userId);
                (<%= camelizedPluralName %>[0].name).should.match('<%= humanizedSingularName %> name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an <%= humanizedSingularName %> if not logged in', function (done) {
    agent.post('/api/<%= camelizedPluralName %>')
      .send(<%= camelizedSingularName %>)
      .expect(403)
      .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
        // Call the assertion callback
        done(<%= camelizedSingularName %>SaveErr);
      });
  });

  it('should not be able to save an <%= humanizedSingularName %> if no name is provided', function (done) {
    // Invalidate name field
    <%= camelizedSingularName %>.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(400)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Set message assertion
            (<%= camelizedSingularName %>SaveRes.body.message).should.match('Please fill <%= humanizedSingularName %> name');

            // Handle <%= humanizedSingularName %> save error
            done(<%= camelizedSingularName %>SaveErr);
          });
      });
  });

  it('should be able to update an <%= humanizedSingularName %> if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= humanizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) {
              return done(<%= camelizedSingularName %>SaveErr);
            }

            // Update <%= humanizedSingularName %> name
            <%= camelizedSingularName %>.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing <%= humanizedSingularName %>
            agent.put('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
              .send(<%= camelizedSingularName %>)
              .expect(200)
              .end(function (<%= camelizedSingularName %>UpdateErr, <%= camelizedSingularName %>UpdateRes) {
                // Handle <%= humanizedSingularName %> update error
                if (<%= camelizedSingularName %>UpdateErr) {
                  return done(<%= camelizedSingularName %>UpdateErr);
                }

                // Set assertions
                (<%= camelizedSingularName %>UpdateRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);
                (<%= camelizedSingularName %>UpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of <%= humanizedPluralName %> if not signed in', function (done) {
    // Create new <%= humanizedSingularName %> model instance
    var <%= camelizedSingularName %>Obj = new <%= classifiedSingularName %>(<%= camelizedSingularName %>);

    // Save the <%= camelizedSingularName %>
    <%= camelizedSingularName %>Obj.save(function () {
      // Request <%= humanizedPluralName %>
      request(app).get('/api/<%= camelizedPluralName %>')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single <%= humanizedSingularName %> if not signed in', function (done) {
    // Create new <%= humanizedSingularName %> model instance
    var <%= camelizedSingularName %>Obj = new <%= classifiedSingularName %>(<%= camelizedSingularName %>);

    // Save the <%= humanizedSingularName %>
    <%= camelizedSingularName %>Obj.save(function () {
      request(app).get('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>Obj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', <%= camelizedSingularName %>.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single <%= humanizedSingularName %> with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/<%= camelizedPluralName %>/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', '<%= humanizedSingularName %> is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single <%= humanizedSingularName %> which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent <%= humanizedSingularName %>
    request(app).get('/api/<%= camelizedPluralName %>/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No <%= humanizedSingularName %> with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an <%= humanizedSingularName %> if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= humanizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= humanizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) {
              return done(<%= camelizedSingularName %>SaveErr);
            }

            // Delete an existing <%= humanizedSingularName %>
            agent.delete('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
              .send(<%= camelizedSingularName %>)
              .expect(200)
              .end(function (<%= camelizedSingularName %>DeleteErr, <%= camelizedSingularName %>DeleteRes) {
                // Handle <%= camelizedSingularName %> error error
                if (<%= camelizedSingularName %>DeleteErr) {
                  return done(<%= camelizedSingularName %>DeleteErr);
                }

                // Set assertions
                (<%= camelizedSingularName %>DeleteRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an <%= humanizedSingularName %> if not signed in', function (done) {
    // Set <%= humanizedSingularName %> user
    <%= camelizedSingularName %>.user = user;

    // Create new <%= humanizedSingularName %> model instance
    var <%= camelizedSingularName %>Obj = new <%= classifiedSingularName %>(<%= camelizedSingularName %>);

    // Save the <%= humanizedSingularName %>
    <%= camelizedSingularName %>Obj.save(function () {
      // Try deleting <%= humanizedSingularName %>
      request(app).delete('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>Obj._id)
        .expect(403)
        .end(function (<%= camelizedSingularName %>DeleteErr, <%= camelizedSingularName %>DeleteRes) {
          // Set message assertion
          (<%= camelizedSingularName %>DeleteRes.body.message).should.match('User is not authorized');

          // Handle <%= humanizedSingularName %> error error
          done(<%= camelizedSingularName %>DeleteErr);
        });

    });
  });

  it('should be able to get a single <%= humanizedSingularName %> that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new <%= humanizedSingularName %>
          agent.post('/api/<%= camelizedPluralName %>')
            .send(<%= camelizedSingularName %>)
            .expect(200)
            .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
              // Handle <%= humanizedSingularName %> save error
              if (<%= camelizedSingularName %>SaveErr) {
                return done(<%= camelizedSingularName %>SaveErr);
              }

              // Set assertions on new <%= humanizedSingularName %>
              (<%= camelizedSingularName %>SaveRes.body.name).should.equal(<%= camelizedSingularName %>.name);
              should.exist(<%= camelizedSingularName %>SaveRes.body.user);
              should.equal(<%= camelizedSingularName %>SaveRes.body.user._id, orphanId);

              // force the <%= humanizedSingularName %> to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the <%= humanizedSingularName %>
                    agent.get('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
                      .expect(200)
                      .end(function (<%= camelizedSingularName %>InfoErr, <%= camelizedSingularName %>InfoRes) {
                        // Handle <%= humanizedSingularName %> error
                        if (<%= camelizedSingularName %>InfoErr) {
                          return done(<%= camelizedSingularName %>InfoErr);
                        }

                        // Set assertions
                        (<%= camelizedSingularName %>InfoRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);
                        (<%= camelizedSingularName %>InfoRes.body.name).should.equal(<%= camelizedSingularName %>.name);
                        should.equal(<%= camelizedSingularName %>InfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      <%= classifiedSingularName %>.remove().exec(done);
    });
  });
});
