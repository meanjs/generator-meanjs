'use strict';

var path = require('path'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert,
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
  after(function () {
    temp.cleanup();
  });

  describe('Generate an AngularJS route files through the sub-generator', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-route'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'moduleName': 'core',
          'name': 'foo',
          'routePath': 'fooroute',
          'viewName': 'fooview',
          'controllerName': 'fooctrl'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular route file', function () {
      assert.file('modules/core/client/config/core.client.routes.js');
      assert.file('modules/core/client/controllers/fooctrl.client.controller.js');
      assert.file('modules/core/client/views/fooview.client.view.html');
      assert.file('modules/core/tests/client/fooctrl.client.controller.tests.js');

      assert.fileContent('modules/core/client/config/core.client.routes.js',
        "'use strict';\n\n" +
        "//Setting up route\n" +
        "angular.module('core').config(['$stateProvider',\n" +
        "  function($stateProvider) {\n" +
        "    // Core state routing\n" +
        "    $stateProvider\n" +
        "      .state('foo', {\n" +
        "        url: '/fooroute',\n" +
        "        templateUrl: 'modules/core/client/views/fooview.client.view.html'\n" +
        "      });\n" +
        "  }\n" +
        "]);\n"
      );
    });
  });

  describe('Generate an AngularJS route files through the sub-generator (no name specified)', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-route'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'moduleName': 'core',
          'routePath': 'fooroute',
          'viewName': 'fooview',
          'controllerName': 'fooctrl'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular route file', function () {
      assert.file('modules/core/client/config/core.client.routes.js');
      assert.file('modules/core/client/controllers/fooctrl.client.controller.js');
      assert.file('modules/core/client/views/fooview.client.view.html');
      assert.file('modules/core/tests/client/fooctrl.client.controller.tests.js');

      assert.fileContent('modules/core/client/config/core.client.routes.js',
        "'use strict';\n\n" +
        "//Setting up route\n" +
        "angular.module('core').config(['$stateProvider',\n" +
        "  function($stateProvider) {\n" +
        "    // Core state routing\n" +
        "    $stateProvider\n" +
        "      .state('core', {\n" +
        "        url: '/fooroute',\n" +
        "        templateUrl: 'modules/core/client/views/fooview.client.view.html'\n" +
        "      });\n" +
        "  }\n" +
        "]);\n"
      );
    });
  });

  describe('Generate an AngularJS route files through the sub-generator (no route path specified)', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-route'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'moduleName': 'core',
          'viewName': 'fooview',
          'controllerName': 'fooctrl'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular route file', function () {
      assert.file('modules/core/client/config/core.client.routes.js');
      assert.file('modules/core/client/controllers/fooctrl.client.controller.js');
      assert.file('modules/core/client/views/fooview.client.view.html');
      assert.file('modules/core/tests/client/fooctrl.client.controller.tests.js');

      assert.fileContent('modules/core/client/config/core.client.routes.js',
        "'use strict';\n\n" +
        "//Setting up route\n" +
        "angular.module('core').config(['$stateProvider',\n" +
        "  function($stateProvider) {\n" +
        "    // Core state routing\n" +
        "    $stateProvider\n" +
        "      .state('core', {\n" +
        "        url: '/core',\n" +
        "        templateUrl: 'modules/core/client/views/fooview.client.view.html'\n" +
        "      });\n" +
        "  }\n" +
        "]);\n"
      );
    });
  });

  describe('Generate an AngularJS route files through the sub-generator (no view name specified)', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-route'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'moduleName': 'core',
          'routePath': 'fooroute',
          'controllerName': 'fooctrl'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular route file', function () {
      assert.file('modules/core/client/config/core.client.routes.js');
      assert.file('modules/core/client/controllers/fooctrl.client.controller.js');
      assert.file('modules/core/client/views/core.client.view.html');
      assert.file('modules/core/tests/client/fooctrl.client.controller.tests.js');

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

  describe('Generate an AngularJS route files through the sub-generator (no controller name specified)', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-route'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          'moduleName': 'core',
          'routePath': 'fooroute',
          'viewName': 'fooview'
        })
        .on('ready', function (generator) {
          // this is called right before `generator.run()` is called
        })
        .on('end', function () {
          done();
        });
    });

    it('should generate an angular route file', function () {
      assert.file('modules/core/client/config/core.client.routes.js');
      assert.file('modules/core/client/controllers/core.client.controller.js');
      assert.file('modules/core/client/views/fooview.client.view.html');
      assert.file('modules/core/tests/client/core.client.controller.tests.js');

      assert.fileContent('modules/core/client/config/core.client.routes.js',
        "'use strict';\n\n" +
        "//Setting up route\n" +
        "angular.module('core').config(['$stateProvider',\n" +
        "  function($stateProvider) {\n" +
        "    // Core state routing\n" +
        "    $stateProvider\n" +
        "      .state('core', {\n" +
        "        url: '/fooroute',\n" +
        "        templateUrl: 'modules/core/client/views/fooview.client.view.html'\n" +
        "      });\n" +
        "  }\n" +
        "]);\n"
      );
    });
  });

  describe('Generate an AngularJS route files through the sub-generator (no names specified)', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../angular-route'))
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

    it('should generate an angular route file', function () {
      assert.file('modules/core/client/config/core.client.routes.js');
      assert.file('modules/core/client/controllers/core.client.controller.js');
      assert.file('modules/core/client/views/core.client.view.html');
      assert.file('modules/core/tests/client/core.client.controller.tests.js');

      assert.fileContent('modules/core/client/config/core.client.routes.js',
        "'use strict';\n\n" +
        "//Setting up route\n" +
        "angular.module('core').config(['$stateProvider',\n" +
        "  function($stateProvider) {\n" +
        "    // Core state routing\n" +
        "    $stateProvider\n" +
        "      .state('core', {\n" +
        "        url: '/core',\n" +
        "        templateUrl: 'modules/core/client/views/core.client.view.html'\n" +
        "      });\n" +
        "  }\n" +
        "]);\n"
      );
    });

    describe('Add a route path with route file already existing', function () {
      beforeEach(function (done) {
        helpers.run(path.join(__dirname, '../angular-route'))
          .withOptions({
            'skip-install': true
          })
          .withPrompts({
            'moduleName': 'core',
            'name': 'bar',
            'routePath': 'barroute',
            'viewName': 'barview',
            'controllerName': 'barctrl'
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
        assert.file('modules/core/client/controllers/barctrl.client.controller.js');
        assert.file('modules/core/client/views/barview.client.view.html');
        assert.file('modules/core/tests/client/barctrl.client.controller.tests.js');

        assert.fileContent('modules/core/client/config/core.client.routes.js',
          "'use strict';\n\n" +
          "//Setting up route\n" +
          "angular.module('core').config(['$stateProvider',\n" +
          "  function($stateProvider) {\n" +
          "    // Core state routing\n" +
          "    $stateProvider\n" +
          "      .state('bar', {\n" +
          "        url: '/barroute',\n" +
          "        templateUrl: 'modules/core/client/views/barview.client.view.html'\n" +
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
