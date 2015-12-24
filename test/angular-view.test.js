'use strict';

var path = require('path'),
  fs = require('fs-extra'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  tempDir,
  temp = require('temp').track();

describe('Angular View Subgenerator', function () {
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

  describe('Generate an Angular View file', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-view'))
        .inTmpDir(function (dir) {
          tempDir = dir;
          fs.copySync(path.join(__dirname, 'temp'), dir)
        })
        .withOptions({
          'skip-install': true
        })
        .withArguments(['foo'])
        .withPrompts({
          'moduleName': 'core',
          'controllerName': 'Foo',
          'addRoute' : true,
          'routePath' : 'foo'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular route file', function () {
      assert.file(tempDir+'/modules/core/client/config/core.client.routes.js');
    });

    it('should generate an angular controller view file', function () {
      assert.file(tempDir+'/modules/core/client/views/foo.client.view.html');
    });


  });
});