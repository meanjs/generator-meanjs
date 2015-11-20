var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  temp = require('temp').track();

describe('Main Generator', function () {
  this.timeout(0);
  /**
   * Setup the temp directory
   */
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), done);
  });

  /**
   * Clean up temp directory
   */
  afterEach(function () {
    temp.cleanup();
  });

  describe('Application generator without sample module', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          'skip-install': true
        })
        .withArguments([])
        .withPrompts({
          version: '0.4.0',
          folder: 'temp',
          appName: 'MEAN',
          appDescription: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
          appKeywords: 'MongoDB, Express, AngularJS, Node.js',
          appAuthor: 'Test',
          addArticleExample: false,
          addChatExample: false
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', done);
    });

    it('should generate a package.json file', function () {
      assert.file('temp/package.json');
    });
  });

});
