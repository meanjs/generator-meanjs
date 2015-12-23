'use strict';

var path = require('path'),
  fs = require('fs-extra'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  tempDir,
  temp = require('temp').track();

describe('CRUD Subgenerator', function () {
  this.timeout(0);
  /**
   * Setup the temp directory
   */
  before(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp/modules/core'), done);
  });

  /**
   * Clean up temp directory
   */
  after(function () {
   // fs.removeSync(tempDir);
    fs.removeSync(path.join(__dirname, 'temp'));
  });

  describe('Generate an CRUD modules files', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../crud-module'))
        .inTmpDir(function (dir) {
          tempDir = dir;
          fs.copySync(path.join(__dirname, 'temp'), dir)
        })
        .withOptions({
          'skip-install': true
        })
        .withArguments(['foo'])
        .withPrompts({
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

    it('should generate an express server files', function () {
      assert.file(tempDir+'/modules/foos/server/controllers/foos.server.controller.js');
      assert.file(tempDir+'/modules/foos/server/models/foo.server.model.js');
      assert.file(tempDir+'/modules/foos/server/routes/foos.server.routes.js');
      assert.file(tempDir+'/modules/foos/server/policies/foos.server.policy.js');
    });

    it('should generate an angular client files', function () {
      assert.file(tempDir+'/modules/foos/client/config/foos.client.routes.js');
      assert.file(tempDir+'/modules/foos/client/controllers/foos.client.controller.js');
      assert.file(tempDir+'/modules/foos/client/services/foos.client.service.js');
      assert.file(tempDir+'/modules/foos/client/views/create-foo.client.view.html');
      assert.file(tempDir+'/modules/foos/client/views/edit-foo.client.view.html');
      assert.file(tempDir+'/modules/foos/client/views/list-foos.client.view.html');
      assert.file(tempDir+'/modules/foos/client/views/view-foo.client.view.html');
      assert.file(tempDir+'/modules/foos/client/foos.client.module.js');
      assert.file(tempDir+'/modules/foos/client/config/foos.client.config.js');
    });

    it('should generate an express server test files', function () {
      assert.file(tempDir+'/modules/foos/tests/server/foo.server.model.tests.js');
      assert.file(tempDir+'/modules/foos/tests/server/foo.server.routes.tests.js');
      assert.file(tempDir+'/modules/foos/tests/client/foos.client.controller.tests.js');
      assert.file(tempDir+'/modules/foos/tests/e2e/foos.e2e.tests.js');
    });

  });
});