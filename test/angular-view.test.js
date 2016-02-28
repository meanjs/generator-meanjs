'use strict';

var path = require('path'),
  fs = require('fs'),
  EOL = require('os').EOL,
  mkdirp = require('mkdirp'),
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
          "(function () {" + EOL +
          "  'use strict';" + EOL + EOL +
          "  //Setting up route" + EOL +
          "  angular"  + EOL +
          "    .module('core')" + EOL +
          "    .config(routeConfig);" + EOL + EOL +
          "  routeConfig.$inject = ['$stateProvider'];" + EOL + EOL +
          "  function routeConfig($stateProvider) {" + EOL +
          "    // Core state routing" + EOL +
          "    $stateProvider" + EOL +
          "      .state('foo', {" + EOL +
          "        url: '/fooroute'," + EOL +
          "        templateUrl: 'modules/core/client/views/foo.client.view.html'," + EOL +
          "        controller: 'FooctrlController'," + EOL +
          "        controllerAs: 'vm'" + EOL +
          "      });" + EOL +
          "  }" + EOL +
          "})();" + EOL
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
          "(function () {" + EOL +
          "  'use strict';" + EOL + EOL +
          "  //Setting up route" + EOL +
          "  angular"  + EOL +
          "    .module('core')" + EOL +
          "    .config(routeConfig);" + EOL + EOL +
          "  routeConfig.$inject = ['$stateProvider'];" + EOL + EOL +
          "  function routeConfig($stateProvider) {" + EOL +
          "    // Core state routing" + EOL +
          "    $stateProvider" + EOL +
          "      .state('core', {" + EOL +
          "        url: '/fooroute'," + EOL +
          "        templateUrl: 'modules/core/client/views/core.client.view.html'," + EOL +
          "        controller: 'FooctrlController'," + EOL +
          "        controllerAs: 'vm'" + EOL +
          "      });" + EOL +
          "  }" + EOL +
          "})();" + EOL
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
              "(function () {" + EOL +
              "  'use strict';" + EOL + EOL +
              "  //Setting up route" + EOL +
              "  angular"  + EOL +
              "    .module('core')" + EOL +
              "    .config(routeConfig);" + EOL + EOL +
              "  routeConfig.$inject = ['$stateProvider'];" + EOL + EOL +
              "  function routeConfig($stateProvider) {" + EOL +
              "    // Core state routing" + EOL +
              "    $stateProvider" + EOL +
              "      .state('core', {" + EOL +
              "        url: '/fooroute'," + EOL +
              "        templateUrl: 'modules/core/client/views/core.client.view.html'," + EOL +
              "        controller: 'FooctrlController'," + EOL +
              "        controllerAs: 'vm'" + EOL +
              "      });" + EOL +
              "  }" + EOL +
              "})();" + EOL
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
          "(function () {" + EOL +
          "  'use strict';" + EOL + EOL +
          "  //Setting up route" + EOL +
          "  angular"  + EOL +
          "    .module('core')" + EOL +
          "    .config(routeConfig);" + EOL + EOL +
          "  routeConfig.$inject = ['$stateProvider'];" + EOL + EOL +
          "  function routeConfig($stateProvider) {" + EOL +
          "    // Core state routing" + EOL +
          "    $stateProvider" + EOL +
          "      .state('bar', {" + EOL +
          "        url: '/barroute'," + EOL +
          "        templateUrl: 'modules/core/client/views/bar.client.view.html'," + EOL +
          "        controller: 'BarctrlController'," + EOL +
          "        controllerAs: 'vm'" + EOL +
          "      })" + EOL +
          "      .state('core', {" + EOL +
          "        url: '/fooroute'," + EOL +
          "        templateUrl: 'modules/core/client/views/core.client.view.html'," + EOL +
          "        controller: 'FooctrlController'," + EOL +
          "        controllerAs: 'vm'" + EOL +
          "      });" + EOL +
          "  }" + EOL +
          "})();" + EOL
        );
      });
    });
  });
});
