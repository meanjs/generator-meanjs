'use strict';

var path = require('path'),
  fs = require('fs'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  rimraf = require('rimraf'),
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
  after(function (done) {
    temp.cleanup();

    rimraf(path.join(__dirname, 'temp'), done);
  });

  describe('Application generator without sample module 0.4.0', function () {
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
    
    it('should generate a bower.json file', function () {
      assert.file('temp/bower.json');
    });
    
    it('should populate the bower.json correctly', function (done) {
      fs.readFile('temp/bower.json', function (err, data) {
        if(err) {
          done(err);
        } else {
          var bowerJson = JSON.parse(data);
          assert.equal(bowerJson.name, 'meantestappname');
          assert.equal(bowerJson.description, 'Testing the generator');
          done();
        }
      });
    });
    
  });

  describe('Application generator without sample module 0.4.1', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          'skip-install': true
        })
        .withArguments([])
        .withPrompts({
          version: '0.4.1',
          folder: 'temp',
          appName: 'MEANtestAppName041',
          appDescription: 'Testing the generator 041',
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
          assert.equal(packageJson.name, 'meantestappname041');
          assert.equal(packageJson.description, 'Testing the generator 041');
          assert.equal(packageJson.author, 'Test');
          done();
        }
      });
    });
    
    it('should generate a bower.json file', function () {
      assert.file('temp/bower.json');
    });
    
    it('should populate the bower.json correctly', function (done) {
      fs.readFile('temp/bower.json', function (err, data) {
        if(err) {
          done(err);
        } else {
          var bowerJson = JSON.parse(data);
          assert.equal(bowerJson.name, 'meantestappname041');
          assert.equal(bowerJson.description, 'Testing the generator 041');
          done();
        }
      });
    });
    
  });

  describe('Application generator without sample module 0.4.2', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          'skip-install': true
        })
        .withArguments([])
        .withPrompts({
          version: '0.4.2',
          folder: 'temp',
          appName: 'MEANtestAppName042',
          appDescription: 'Testing the generator 042',
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
          assert.equal(packageJson.name, 'meantestappname042');
          assert.equal(packageJson.description, 'Testing the generator 042');
          assert.equal(packageJson.author, 'Test');
          
          // Testing the meanjs version was introduced in 0.4.2
          assert.equal(packageJson['meanjs-version'], '0.4.2');
          
          done();
        }
      });
    });
    
    it('should generate a bower.json file', function () {
      assert.file('temp/bower.json');
    });
    
    it('should populate the bower.json correctly', function (done) {
      fs.readFile('temp/bower.json', function (err, data) {
        if(err) {
          done(err);
        } else {
          var bowerJson = JSON.parse(data);
          assert.equal(bowerJson.name, 'meantestappname042');
          assert.equal(bowerJson.description, 'Testing the generator 042');
          done();
        }
      });
    });
    
  });

});
