'use strict';

var path = require('path'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
  temp = require('temp').track();

describe('AngularJS Sub Generators Tests', function () {
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

  describe('Generate an AngularJS view files through the sub-generator', function () {
    describe('Do not add a route path', function () {
      beforeEach(function (done) {
        helpers.run(path.join(__dirname, '../angular-view'))
          .withOptions({
            'skip-install': true
          })
          .withPrompts({
            'moduleName': 'core',
            'name': 'foo',
            'controllerName': 'fooctrl',
            'addRoute': false
          })
          .on('ready', function (generator) {
            // this is called right before `generator.run()` is called
          })
          .on('end', function () {
            done();
          });
      });

      it('should generate an angular view file', function () {
        assert.noFile('modules/core/client/config/core.client.routes.js');
        assert.file('modules/core/client/views/foo.client.view.html');
      });
    });

    describe('Add a route path', function () {
      beforeEach(function (done) {
        helpers.run(path.join(__dirname, '../angular-view'))
          .withOptions({
            'skip-install': true
          })
          .withPrompts({
            'moduleName': 'core',
            'name': 'foo',
            'controllerName': 'fooctrl',
            'addRoute': true,
            'routePath': 'fooroute'
          })
          .on('ready', function (generator) {
            // this is called right before `generator.run()` is called
          })
          .on('end', function () {
            done();
          });
      });

      it('should generate an angular view file', function () {
        assert.file('modules/core/client/config/core.client.routes.js');
        assert.file('modules/core/client/views/foo.client.view.html');

        assert.fileContent('modules/core/client/config/core.client.routes.js',
          "'use strict';\n\n" +
          "//Setting up route\n" +
          "angular.module('core').config(['$stateProvider',\n" +
          "  function($stateProvider) {\n" +
          "    // Core state routing\n" +
          "    $stateProvider\n" +
          "      .state('foo', {\n" +
          "        url: '/fooroute',\n" +
          "        templateUrl: 'modules/core/client/views/foo.client.view.html'\n" +
          "      });\n" +
          "  }\n" +
          "]);\n"
        );
      });
    });

    describe('Add a route path (no name specified)', function () {
      beforeEach(function (done) {
        helpers.run(path.join(__dirname, '../angular-view'))
          .withOptions({
            'skip-install': true
          })
          .withPrompts({
            'moduleName': 'core',
            'controllerName': 'fooctrl',
            'addRoute': true,
            'routePath': 'fooroute'
          })
          .on('ready', function (generator) {
            // this is called right before `generator.run()` is called
          })
          .on('end', function () {
            done();
          });
      });

      it('should generate an angular view file', function () {
        assert.file('modules/core/client/config/core.client.routes.js');
        assert.file('modules/core/client/views/core.client.view.html');

        assert.fileContent('modules/core/client/config/core.client.routes.js',
          "'use strict';\n\n" +
          "//Setting up route\n" +
          "angular.module('core').config(['$stateProvider',\n" +
          "  function($stateProvider) {\n" +
          "    // Core state routing\n" +
          "    $stateProvider\n" +
          "      .state('core', {\n" +
          "        url: '/fooroute',\n" +
          "        templateUrl: 'modules/core/client/views/core.client.view.html'\n" +
          "      });\n" +
          "  }\n" +
          "]);\n"
        );
      });
    });

    describe('Add a route path with route file already existing', function () {
      beforeEach(function (done) {
        helpers.run(path.join(__dirname, '../angular-view'))
          .withOptions({
            'skip-install': true
          })
          .withPrompts({
            'moduleName': 'core',
            'name': 'bar',
            'controllerName': 'barctrl',
            'addRoute': true,
            'routePath': 'barroute'
          })
          .on('ready', function (generator) {
            mkdirp.sync('modules/core/client/config');
            fs.writeFileSync(
              'modules/core/client/config/core.client.routes.js',
              "'use strict';\n\n" +
              "//Setting up route\n" +
              "angular.module('core').config(['$stateProvider',\n" +
              "  function($stateProvider) {\n" +
              "    // Core state routing\n" +
              "    $stateProvider\n" +
              "      .state('core', {\n" +
              "        url: '/fooroute',\n" +
              "        templateUrl: 'modules/core/client/views/core.client.view.html'\n" +
              "      });\n" +
              "  }\n" +
              "]);\n",
              'utf8'
            );
          })
          .on('end', function () {
            done();
          });
      });

      it('should generate an angular view file', function () {
        assert.file('modules/core/client/config/core.client.routes.js');
        assert.file('modules/core/client/views/bar.client.view.html');

        assert.fileContent('modules/core/client/config/core.client.routes.js',
          "'use strict';\n\n" +
          "//Setting up route\n" +
          "angular.module('core').config(['$stateProvider',\n" +
          "  function($stateProvider) {\n" +
          "    // Core state routing\n" +
          "    $stateProvider\n" +
          "      .state('bar', {\n" +
          "        url: '/barroute',\n" +
          "        templateUrl: 'modules/core/client/views/bar.client.view.html'\n" +
          "      })\n" +
          "      .state('core', {\n" +
          "        url: '/fooroute',\n" +
          "        templateUrl: 'modules/core/client/views/core.client.view.html'\n" +
          "      });\n" +
          "  }\n" +
          "]);\n"
        );
      });
    });
  });
});
