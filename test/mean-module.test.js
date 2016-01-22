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

  describe('Generate a MEAN module with complete folder structure through the sub-generator', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../mean-module'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          name: 'foo',
          clientFolders: [
            'addConfigFolder',
            'addControllersFolder',
            'addCSSFolder',
            'addDirectivesFolder',
            'addFiltersFolder',
            'addImagesFolder',
            'addServicesFolder',
            'addTestsFolder',
            'addViewsFolder'
          ],
          serverFolders: [
            'addConfigFolder',
            'addControllersFolder',
            'addModelsFolder',
            'addPoliciesFolder',
            'addRoutesFolder',
            'addTestsFolder'
          ]
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular module and an express config file', function () {
      assert.file('modules/foo/client/foo.client.module.js');
      assert.file('modules/foo/server/config/foo.server.config.js');

      // Checking for folders existence
      assert.file('modules/foo/client/config/');
      assert.file('modules/foo/client/controllers/');
      assert.file('modules/foo/client/css/');
      assert.file('modules/foo/client/directives/');
      assert.file('modules/foo/client/filters/');
      assert.file('modules/foo/client/img/');
      assert.file('modules/foo/client/services/');
      assert.file('modules/foo/client/views/');
      assert.file('modules/foo/tests/client/');
      assert.file('modules/foo/server/config/');
      assert.file('modules/foo/server/controllers/');
      assert.file('modules/foo/server/models/');
      assert.file('modules/foo/server/policies/');
      assert.file('modules/foo/server/routes/');
      assert.file('modules/foo/tests/server/');
    });
  });
});
