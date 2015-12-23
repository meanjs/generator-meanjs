'use strict';

var path = require('path'),
  fs = require('fs-extra'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  tempDir,
  temp = require('temp').track();

describe('Angular Config Subgenerator', function () {
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
    fs.removeSync(tempDir);
    fs.removeSync(path.join(__dirname, 'temp'));
  });

  describe('Generate an Angular Config file', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-config'))
        .inTmpDir(function (dir) {
          tempDir = dir;
          fs.copySync(path.join(__dirname, 'temp'), dir)
        })
        .withOptions({
          'skip-install': true
        })
        .withArguments(['foo'])
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

    it('should generate an angular config file', function () {
      assert.file(tempDir+'/modules/core/client/config/foos.client.config.js');
    });


  });
});