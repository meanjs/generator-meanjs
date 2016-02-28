'use strict';

var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  rimraf = require('rimraf'),
  temp = require('temp').track();

describe('Module Sub Generators Tests', function () {
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
  after(function (done) {
    temp.cleanup();

    rimraf(path.join(__dirname, 'temp'), done);
  });

  describe('Generate a CRUD module through the sub-generator', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../crud-module'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          name: 'foo',
          clientFolders: [
            'addCSSFolder',
            'addImagesFolder',
            'addDirectivesFolder',
            'addFiltersFolder'
          ],
          addMenuItems: true,
          menuId: 'topbar'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate all CRUD module files and additional folders', function () {
      assert.file('modules/foos/client/foos.client.module.js');
      assert.file('modules/foos/server/config/foos.server.config.js');

      // Checking for folders existence
      assert.file('modules/foos/client/css/');
      assert.file('modules/foos/client/img/');
      assert.file('modules/foos/client/directives/');
      assert.file('modules/foos/client/filters/');

      // Checking for client files existence
      assert.file('modules/foos/client/config/foos.client.routes.js');
      assert.file('modules/foos/client/controllers/foos.client.controller.js');
      assert.file('modules/foos/client/controllers/list-foos.client.controller.js');
      assert.file('modules/foos/client/services/foos.client.service.js');

      // Checking for client-side tests
      assert.file('modules/foos/tests/client/foos.client.controller.tests.js');
      assert.file('modules/foos/tests/client/foos.client.routes.tests.js');
      assert.file('modules/foos/tests/client/list-foos.client.controller.tests.js');

      // Checking for views
      assert.file('modules/foos/client/views/form-foo.client.view.html');
      assert.file('modules/foos/client/views/view-foo.client.view.html');
      assert.file('modules/foos/client/views/list-foos.client.view.html');

      // Checking for menu config
      assert.file('modules/foos/client/config/foos.client.config.js');

      // Checking for e2e tests
      assert.file('modules/foos/tests/e2e/foos.e2e.tests.js');

      // Checking for server files existence
      assert.file('modules/foos/server/config/foos.server.config.js');
      assert.file('modules/foos/server/controllers/foos.server.controller.js');
      assert.file('modules/foos/server/models/foo.server.model.js');
      assert.file('modules/foos/server/routes/foos.server.routes.js');
      assert.file('modules/foos/server/policies/foos.server.policy.js');

      // Checking for server-side tests
      assert.file('modules/foos/tests/server/foo.server.model.tests.js');
      assert.file('modules/foos/tests/server/foo.server.routes.tests.js');
    });
  });
});
