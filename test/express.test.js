var path = require('path'),
    fs = require('fs'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert,
    temp = require('temp').track();

describe('Express Sub Generators Tests', function() {
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

    describe('Generate an express controller through the sub-generator', function() {
        beforeEach(function(done) {
            helpers.run(path.join(__dirname, '../express-controller'))
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

        it('should generate an express controller file', function() {
            assert.file('modules/core/server/controllers/foo.server.controller.js');
        });
    });

    describe('Generate an express model through the sub-generator', function() {
        beforeEach(function(done) {
            helpers.run(path.join(__dirname, '../express-model'))
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

        it('should generate an express model and an associated test file', function() {
            assert.file('modules/core/server/models/foo.server.model.js');
            assert.file('modules/core/tests/server/foo.server.model.tests.js');
        });
    });

    describe('Generate an express route through the sub-generator', function() {
        beforeEach(function(done) {
            helpers.run(path.join(__dirname, '../express-route'))
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

        it('should generate an express route file', function() {
            assert.file('modules/core/server/routes/foo.server.routes.js');
        });
    });

    describe('Generate an express test through the sub-generator', function() {
        beforeEach(function(done) {
            helpers.run(path.join(__dirname, '../express-tests'))
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

        it('should generate an express route file', function() {
            assert.file('modules/core/server/models/foo.server.model.js');
            assert.file('modules/core/tests/server/foo.server.model.tests.js');
        });
    });
});

//describe('AngularJS Sub Generators Tests', function() {
//  describe('Generate an AngularJS config file through the sub-generator', function() {
//    beforeEach(function(done) {
//      runGenerator('angular-config',
//          'foo',
//          this, {
//            'moduleName': 'core'
//          }, done);
//    });
//
//    it('should generate an angular config file', function(done) {
//      assert.file('public/modules/core/config/foo.client.config.js');
//      done();
//    });
//  });
//
//  describe('Generate an AngularJS controller with tests through the sub-generator', function() {
//    beforeEach(function(done) {
//      runGenerator('angular-controller',
//          'foo',
//          this, {
//            'moduleName': 'core'
//          }, done);
//    });
//
//    it('should generate an angular controller file', function(done) {
//      assert.file('public/modules/core/controllers/foo.client.controller.js');
//      assert.file('public/modules/core/tests/foo.client.controller.test.js');
//      done();
//    });
//  });
//
//  describe('Generate an AngularJS directive file through the sub-generator', function() {
//    beforeEach(function(done) {
//      runGenerator('angular-directive',
//          'foo',
//          this, {
//            'moduleName': 'core'
//          }, done);
//    });
//
//    it('should generate an angular directive file', function() {
//      assert.file('public/modules/core/directives/foo.client.directive.js');
//    });
//  });
//
//  describe('Generate an AngularJS filter file through the sub-generator', function() {
//    beforeEach(function(done) {
//      runGenerator('angular-filter',
//          'foo',
//          this, {
//            'moduleName': 'core'
//          }, done);
//    });
//
//    it('should generate an angular filter file', function() {
//      assert.file('public/modules/core/filters/foo.client.filter.js');
//    });
//  });
//
//  describe('Generate an AngularJS route files through the sub-generator', function() {
//    beforeEach(function(done) {
//      runGenerator('angular-route',
//          'foo',
//          this, {
//            'moduleName': 'core',
//            'routePath': 'fooroute',
//            'viewName': 'fooview',
//            'controllerName': 'fooctrl'
//          }, done);
//    });
//
//    it('should generate an angular route file', function() {
//      assert.file('public/modules/core/controllers/fooctrl.client.controller.js');
//      assert.file('public/modules/core/views/fooview.client.view.html');
//      assert.file('public/modules/core/tests/fooctrl.client.controller.test.js');
//    });
//  });
//
//  describe('Generate an AngularJS service file through the sub-generator', function() {
//    beforeEach(function(done) {
//      runGenerator('angular-service',
//          'foo',
//          this, {
//            'moduleName': 'core'
//          }, done);
//    });
//
//    it('should generate an angular service file', function() {
//      assert.file('public/modules/core/services/foo.client.service.js');
//    });
//  });
//
//  describe('Generate an AngularJS view files through the sub-generator', function() {
//    describe('Do not add a route path', function() {
//      beforeEach(function(done) {
//        runGenerator('angular-view',
//            'foo',
//            this, {
//              'moduleName': 'core',
//              'controllerName': 'fooctrl',
//              'addRoute': false
//            }, done);
//      });
//
//      it('should generate an angular view file', function() {
//        assert.file('public/modules/core/views/foo.client.view.html');
//      });
//    });
//
//    describe('Add a route path', function() {
//      beforeEach(function(done) {
//        runGenerator('angular-view',
//            'foo',
//            this, {
//              'moduleName': 'core',
//              'controllerName': 'fooctrl',
//              'addRoute': true,
//              'routePath': 'fooroute'
//            }, done);
//      });
//
//      it('should generate an angular view file', function() {
//        assert.file('public/modules/core/config/core.client.routes.js');
//        assert.file('public/modules/core/views/foo.client.view.html');
//      });
//    });
//  });
//});