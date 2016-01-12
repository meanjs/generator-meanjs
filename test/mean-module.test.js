'use strict';

var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
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
  after(function () {
    temp.cleanup();
  });

  describe('Generate a MEAN module with complete folder structure through the sub-generator', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../mean-module'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          name: 'foo',
          clientFolders: {
            addConfigFolder: true,
            addControllersFolder: true,
            addCSSFolder: true,
            addDirectivesFolder: true,
            addFiltersFolder: true,
            addImagesFolder: true,
            addServicesFolder: true,
            addTestsFolder: true,
            addViewsFolder: true
          },
          serverFolders: {
            addServerConfigFolder: true,
            addServerControllersFolder: true,
            addServerModelsFolder: true,
            addServerPoliciesFolder: true,
            addServerRoutesFolder: true,
            addServerTestsFolder: true
          }
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
    });
  });
});
