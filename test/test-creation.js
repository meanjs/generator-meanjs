'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp').track();
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

describe('meanjs generator', function(){
    /**
    * Clean up temp directory
    */
    afterEach(function(){
        temp.cleanup();
    });

    /**
     * Setup the temp directory
     */
    beforeEach(function(done){
        helpers.testDirectory(path.join(__dirname, 'temp'), function(err){
            if(err){
                console.log('Error', err);
                return err;
            }
        done();
        });
    });

    describe('meanjs generator without sample app', function() {

        beforeEach(function(done){
            runGenerator('app',
                '',
                this, {
                    'appName' : 'MEAN',
                    'appDescription' : 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
                    'appKeywords' : 'MongoDB, Express, AngularJS, Node.js',
                    'appAuthor' : 'Test',
                    'addArticleExample' : false
                }, done
            );
        });

        /**
         * Should create expected files when sample article example is not chosen
         */
        it('should create expected files when sample article example is not chosen',
            function() {

            var expected = [

                "app/views/404.server.view.html",
                "app/views/500.server.view.html",
                "app/views/index.server.view.html",
                "app/views/layout.server.view.html",
                "app/controllers/core.server.controller.js",
                "app/controllers/users.server.controller.js",
                "app/models/user.server.model.js",
                "app/routes/core.server.routes.js",
                "app/routes/users.server.routes.js",
                "app/tests/user.server.model.test.js",
                "public/application.js",
                "public/humans.txt",
                "public/robots.txt",
                "public/modules/users/config/users.client.config.js",
                "public/modules/users/config/users.client.routes.js",
                "public/modules/users/controllers/authentication.client.controller.js",
                "public/modules/users/controllers/settings.client.controller.js",
                "public/modules/users/css/users.css",
                "public/modules/users/img/buttons/facebook.png",
                "public/modules/users/img/buttons/google.png",
                "public/modules/users/img/buttons/linkedin.png",
                "public/modules/users/img/buttons/twitter.png",
                "public/modules/users/services/authentication.client.service.js",
                "public/modules/users/services/users.client.service.js",
                "public/modules/users/tests/authentication.client.controller.test.js",
                "public/modules/users/users.client.module.js",
                "public/modules/users/views/settings/change-password.client.view.html",
                "public/modules/users/views/settings/edit-profile.client.view.html",
                "public/modules/users/views/settings/social-accounts.client.view.html",
                "public/modules/users/views/signin.client.view.html",
                "public/modules/users/views/signup.client.view.html",
                "public/modules/core/config/core.client.routes.js",
                "public/modules/core/controllers/header.client.controller.js",
                "public/modules/core/controllers/home.client.controller.js",
                "public/modules/core/css/core.css",
                "public/modules/core/img/brand/favicon.ico",
                "public/modules/core/img/brand/logo.png",
                "public/modules/core/img/loaders/loader.gif",
                "public/modules/core/services/menus.client.service.js",
                "public/modules/core/tests/header.client.controller.test.js",
                "public/modules/core/tests/home.client.controller.test.js",
                "public/modules/core/views/home.client.view.html",
                "public/modules/core/core.client.module.js",
                "config/strategies/facebook.js",
                "config/strategies/google.js",
                "config/strategies/linkedin.js",
                "config/strategies/local.js",
                "config/strategies/twitter.js",
                "config/config.js",
                "config/init.js",
                "config/express.js",
                "config/passport.js",
                "karma.conf.js",
                "gruntfile.js",
                "server.js",
                "Procfile",
                "README.md",
                "LICENSE.md",
                ".bowerrc",
                ".csslintrc",
                ".jshintrc",
                ".gitignore",
                ".slugignore",
                ".travis.yml",
                "config/env/all.js",
                "config/env/development.js",
                "config/env/production.js",
                "config/env/test.js",
                "public/config.js",
                "public/modules/core/views/header.client.view.html",
                "package.json",
                "bower.json"
            ];

            assert.file(expected);
        });
    });

    describe('meanjs generator with sample app', function() {

        beforeEach(function(done){
            runGenerator('app',
                '',
                this, {
                    'appName' : 'MEAN',
                    'appDescription' : 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
                    'appKeywords' : 'MongoDB, Express, AngularJS, Node.js',
                    'appAuthor' : 'Test',
                    'addArticleExample' : true
                }, done
            );
        });

        /*
         * Should create expected files when sample article is chosen
         */
        it('should create expected files when sample article is chosen', function(){
            var expected =[
                "app/views/404.server.view.html",
                "app/views/500.server.view.html",
                "app/views/index.server.view.html",
                "app/views/layout.server.view.html",
                "app/controllers/core.server.controller.js",
                "app/controllers/users.server.controller.js",
                "app/models/user.server.model.js",
                "app/routes/core.server.routes.js",
                "app/routes/users.server.routes.js",
                "app/tests/user.server.model.test.js",
                "public/application.js",
                "public/humans.txt",
                "public/robots.txt",
                "public/modules/users/config/users.client.config.js",
                "public/modules/users/config/users.client.routes.js",
                "public/modules/users/controllers/authentication.client.controller.js",
                "public/modules/users/controllers/settings.client.controller.js",
                "public/modules/users/css/users.css",
                "public/modules/users/img/buttons/facebook.png",
                "public/modules/users/img/buttons/google.png",
                "public/modules/users/img/buttons/linkedin.png",
                "public/modules/users/img/buttons/twitter.png",
                "public/modules/users/services/authentication.client.service.js",
                "public/modules/users/services/users.client.service.js",
                "public/modules/users/tests/authentication.client.controller.test.js",
                "public/modules/users/users.client.module.js",
                "public/modules/users/views/settings/change-password.client.view.html",
                "public/modules/users/views/settings/edit-profile.client.view.html",
                "public/modules/users/views/settings/social-accounts.client.view.html",
                "public/modules/users/views/signin.client.view.html",
                "public/modules/users/views/signup.client.view.html",
                "public/modules/core/config/core.client.routes.js",
                "public/modules/core/controllers/header.client.controller.js",
                "public/modules/core/controllers/home.client.controller.js",
                "public/modules/core/css/core.css",
                "public/modules/core/img/brand/favicon.ico",
                "public/modules/core/img/brand/logo.png",
                "public/modules/core/img/loaders/loader.gif",
                "public/modules/core/services/menus.client.service.js",
                "public/modules/core/tests/header.client.controller.test.js",
                "public/modules/core/tests/home.client.controller.test.js",
                "public/modules/core/views/home.client.view.html",
                "public/modules/core/core.client.module.js",
                "config/strategies/facebook.js",
                "config/strategies/google.js",
                "config/strategies/linkedin.js",
                "config/strategies/local.js",
                "config/strategies/twitter.js",
                "config/config.js",
                "config/init.js",
                "config/express.js",
                "config/passport.js",
                "karma.conf.js",
                "gruntfile.js",
                "server.js",
                "Procfile",
                "README.md",
                "LICENSE.md",
                ".bowerrc",
                ".csslintrc",
                ".jshintrc",
                ".gitignore",
                ".slugignore",
                ".travis.yml"
            ];

            assert.file(expected);
        });
    });

    describe('express sub-generator tests', function(){


        /**
         * express-controller tests
         */
        describe('express-controller', function(){

            /**
             * Generate an express controller through the sub-generator
             */
            beforeEach(function(done){
                runGenerator('express-controller',
                    'foo',
                    this,
                    '', done);
            });

            it('should generate an express controller file', function(){
                assert.file('app/controllers/foo.server.controller.js');
            });
        });

        /**
         * express-model tests
         */
        describe('express-model', function(){

            /**
             * Generate an express controller through the sub-generator
             */
            beforeEach(function(done){
                runGenerator('express-model',
                    'foo',
                    this,
                    '', done);
            });

            it('should generate an express model and an associated test file', function(){
                assert.file('app/models/foo.server.model.js');
                assert.file('app/tests/foo.server.model.test.js');
            });
        });

        /**
         * express-route tests
         */
        describe('express-route', function(){

            /**
             * Generate an express route through the sub-generator
             */
            beforeEach(function(done){
                runGenerator('express-route',
                    'foo',
                    this,
                    '', done);
            });

            it('should generate an express route file', function(){
                assert.file('app/routes/foo.server.routes.js');
            });
        });
    });

    describe('angular sub-generator tests', function(){
        /**
        * angular-config tests
        */
        describe(': angular-config', function(){

            /**
            * Generate an angular config through the sub-generator
            */
            beforeEach(function(done){
                runGenerator('angular-config',
                    'foo',
                    this,{
                        'moduleName' : 'core'
                    }, done);
            });

            it('should generate an angular config file', function(done){
                assert.file('public/modules/core/config/foo.client.config.js');
                done();
            });
        });

        /**
        * angular-controller tests
        */
        describe(': angular-controller', function(){

            /**
            * Generate an angular controller through the sub-generator
            */
            beforeEach(function(done){
                runGenerator('angular-controller',
                    'foo',
                    this,{
                        'moduleName' : 'core'
                    }, done);
            });

            it('should generate an angular controller file', function(done){
                assert.file('public/modules/core/controllers/foo.client.controller.js');
                assert.file('public/modules/core/tests/foo.client.controller.test.js');
                done();
            });
        });

        /**
        * angular-directive tests
        */
        describe(': angular-directive', function(){

            /**
            * Generate an angular directive through the sub-generator
            */
            beforeEach(function(done){
                runGenerator('angular-directive',
                    'foo',
                    this,{
                        'moduleName' : 'core'
                    }, done);
            });

            it('should generate an angular directive file', function(){
                assert.file('public/modules/core/directives/foo.client.directive.js');
            });
        });

        /**
        * angular-filter tests
        */
        describe(': angular-filter', function(){

            /**
            * Generate an angular filter through the sub-generator
            */
            beforeEach(function(done){
                runGenerator('angular-filter',
                    'foo',
                    this,{
                        'moduleName' : 'core'
                    }, done);
            });

            it('should generate an angular filter file', function(){
                assert.file('public/modules/core/filters/foo.client.filter.js');
            });
        });

        /**
        * angular-route tests
        */
        describe(': angular-route', function(){

            /**
            * Generate an angular route through the sub-generator
            */
            beforeEach(function(done){
                runGenerator('angular-route',
                    'foo',
                    this,{
                        'moduleName' : 'core',
                        'routePath' : 'fooroute',
                        'viewName': 'fooview',
                        'controllerName':'fooctrl'
                    }, done);
            });

            it('should generate an angular route file', function(){
                assert.file('public/modules/core/controllers/fooctrl.client.controller.js');
                assert.file('public/modules/core/views/fooview.client.view.html');
                assert.file('public/modules/core/tests/fooctrl.client.controller.test.js');
            });
        });

        /**
        * angular-service tests
        */
        describe(': angular-service', function(){

            /**
            * Generate an angular service through the sub-generator
            */
            beforeEach(function(done){
                runGenerator('angular-service',
                    'foo',
                    this,{
                        'moduleName' : 'core'
                    }, done);
            });

            it('should generate an angular service file', function(){
                assert.file('public/modules/core/services/foo.client.service.js');
            });
        });

        /**
        * angular-view tests
        */
        describe(': angular-view', function(){

            describe('Do not add a route path', function(){
                /**
                * Generate an angular view through the sub-generator
                */
                beforeEach(function(done){
                    runGenerator('angular-view',
                        'foo',
                        this,{
                            'moduleName' : 'core',
                            'controllerName': 'fooctrl',
                            'addRoute' : false
                        }, done);
                });

                it('should generate an angular view file', function(){
                    assert.file('public/modules/core/views/foo.client.view.html');
                });
            });

            describe('Add a route path', function(){
                /**
                * Generate an angular view through the sub-generator
                */
                beforeEach(function(done){
                    runGenerator('angular-view',
                        'foo',
                        this,{
                            'moduleName' : 'core',
                            'controllerName': 'fooctrl',
                            'addRoute' : true,
                            'routePath': 'fooroute'
                        }, done);
                });

                it('should generate an angular view file', function(){
                    assert.file('public/modules/core/config/core.client.routes.js');
                    assert.file('public/modules/core/views/foo.client.view.html');
                });
            });

        });
    });

});

//Extending the yeoman helper method
function runGenerator(generatorType, name, context, promptAnswers, done) {

    var workspace = context.workspace = temp.mkdirSync();
    helpers.testDirectory(workspace, function (err) {

        if (err) {
            return done(err);
        }

        this.app = helpers.createGenerator('meanjs:'+generatorType, [
            path.resolve(__dirname, '../'+generatorType)
        ], [name]);

        helpers.mockPrompt(this.app, promptAnswers);

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            done();
        });

    }.bind(context));
}
