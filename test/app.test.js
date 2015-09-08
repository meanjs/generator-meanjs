'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp').track();
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

//Extending the yeoman helper method
function runGenerator(generatorType, name, context, promptAnswers, done) {
  var workspace = context.workspace = temp.mkdirSync();
  helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {

    if (err) {
      return done(err);
    }

    this.app = helpers.createGenerator('meanjs:' + generatorType, [
      path.resolve(__dirname, '../' + generatorType)
    ], [name]);

    helpers.mockPrompt(this.app, promptAnswers);

    this.app.options['skip-install'] = true;

    this.app.run({}, function() {
      done();
    });

  }.bind(context));
}

describe('Main Generator', function () {
  this.timeout(0);
  /**
   * Setup the temp directory
   */
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        console.log('Error', err);
        return err;
      }
      done();
    });
  });

  /**
   * Clean up temp directory
   */
  afterEach(function () {
    temp.cleanup();
  });

  describe('Application generator without sample module', function () {
    beforeEach(function (done) {
      runGenerator('app',
        '',
        this, {
          'version': '0.4.0',
          'folder': 'temp',
          'appName': 'MEAN',
          'appDescription': 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
          'appKeywords': 'MongoDB, Express, AngularJS, Node.js',
          'appAuthor': 'Test',
          'addArticleExample': false,
          'addChatExample': false
        }, done
      );
    });

    it('should generate a package.json file', function () {
      helpers.assertFile('temp/package.json');
    });
  });

});
