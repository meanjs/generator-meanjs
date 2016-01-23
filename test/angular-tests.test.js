'use strict';

var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  rimraf = require('rimraf'),
  temp = require('temp').track();

describe('AngularJS Sub Generators Tests', function () {
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

  describe('Generate an AngularJS controller with tests through the sub-generator', function () {
    beforeEach(function (done) {

      helpers.run(path.join(__dirname, '../angular-tests'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'moduleName': 'core',
          'name': 'foo'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular controller and tests file', function (done) {
      assert.file('modules/core/client/controllers/foo.client.controller.js');
      assert.file('modules/core/tests/client/foo.client.controller.tests.js');
      done();
    });
  });

  describe('Generate an AngularJS controller with tests through the sub-generator (no name specified)', function () {
    beforeEach(function (done) {

      helpers.run(path.join(__dirname, '../angular-tests'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'moduleName': 'core'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular controller and tests file', function (done) {
      assert.file('modules/core/client/controllers/core.client.controller.js');
      assert.file('modules/core/tests/client/core.client.controller.tests.js');
      done();
    });
  });
});
