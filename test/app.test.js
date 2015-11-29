var path = require('path'),
  fs = require('fs'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  temp = require('temp').track();

describe('Main Generator', function () {
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

  describe('Application generator without sample module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          'skip-install': true
        })
        .withArguments([])
        .withPrompts({
          version: '0.4.0',
          folder: 'temp',
          appName: 'MEANtestAppName',
          appDescription: 'Testing the generator',
          appKeywords: 'MongoDB, Express, AngularJS, Node.js',
          appAuthor: 'Test',
          addArticleExample: false,
          addChatExample: false
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate a package.json file', function () {
      assert.file('temp/package.json');
    });

    it('should have populated package.json correctly', function (done) {
      fs.readFile('temp/package.json', function (err, data) {
        if (err) {
          done(err);
        } else {
          var packageJson = JSON.parse(data);
          assert.equal(packageJson.name, 'meantestappname');
          assert.equal(packageJson.description, 'Testing the generator');
          assert.equal(packageJson.author, 'Test');
          done();
        }
      });
    });
  });

});
