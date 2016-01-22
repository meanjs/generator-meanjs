'use strict';

var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  rimraf = require('rimraf'),
  temp = require('temp').track();

describe('Express Sub Generators Tests', function () {
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

  describe('Generate an express tests through the sub-generator', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../express-tests'))
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

    it('should generate an express route file', function () {
      assert.file('modules/core/server/models/foo.server.model.js');
      assert.file('modules/core/tests/server/foo.server.model.tests.js');
    });
  });

  describe('Generate an express tests through the sub-generator (no name specified)', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../express-tests'))
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

    it('should generate an express route file', function () {
      assert.file('modules/core/server/models/core.server.model.js');
      assert.file('modules/core/tests/server/core.server.model.tests.js');
    });
  });
});
