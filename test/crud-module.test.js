'use strict';

var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  temp = require('temp').track();

describe('CRUD Module Generator Tests', function () {
  this.timeout(0);
  /**
   * Setup the temp directory
   */
  before(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), done);
  });

  /**
   * Clean up temp directory
   */
  after(function () {
    temp.cleanup();
  });

  describe('Generate CRUD module through the sub-generator', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../crud-module'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'name': 'foo',
          'folders': [],
          'addMenuItems': true ,
          'menuId': 'topbar'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an express ,angular and tests files', function () {
      var files = ['modules/foos/server/controllers/foos.server.controller.js',
        'modules/foos/server/models/foo.server.model.js',
        'modules/foos/server/routes/foos.server.routes.js',
        'modules/foos/server/policies/foos.server.policy.js',
        'modules/foos/client/config/foos.client.routes.js',
        'modules/foos/client/controllers/foos.client.controller.js',
        'modules/foos/client/services/foos.client.service.js',
        'modules/foos/client/views/create-foo.client.view.html',
        'modules/foos/client/views/edit-foo.client.view.html',
        'modules/foos/client/views/list-foos.client.view.html',
        'modules/foos/client/views/view-foo.client.view.html',
        'modules/foos/client/foos.client.module.js',
        'modules/foos/client/config/foos.client.config.js',
        'modules/foos/tests/server/foo.server.model.tests.js',
        'modules/foos/tests/server/foo.server.routes.tests.js',
        'modules/foos/tests/client/foos.client.controller.tests.js',
        'modules/foos/tests/e2e/foos.e2e.tests.js'
      ]

      assert.file(files);

    });

  });

});
