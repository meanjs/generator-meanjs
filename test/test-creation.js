'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp').track();
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

describe('meanjs generator', function() {
	var expectedProjectFiles = [
		// Should create views
		"app/views/404.server.view.html",
		"app/views/500.server.view.html",
		"app/views/index.server.view.html",
		"app/views/layout.server.view.html",
		// Should create templates
		"app/views/templates/reset-password-confirm-email.server.view.html",
		"app/views/templates/reset-password-email.server.view.html",
		// Should create controllers
		"app/controllers/core.server.controller.js",
		"app/controllers/users.server.controller.js",
		"app/controllers/errors.server.controller.js",
		// Should create models
		"app/models/user.server.model.js",
		// Should create routes
		"app/routes/core.server.routes.js",
		"app/routes/users.server.routes.js",
		// Should create tests
		"app/tests/user.server.model.test.js",
		// Should create config files
		"config/strategies/facebook.js",
		"config/strategies/google.js",
		"config/strategies/linkedin.js",
		"config/strategies/local.js",
		"config/strategies/twitter.js",
		"config/env/all.js",
		"config/env/development.js",
		"config/env/production.js",
		"config/env/test.js",
		"config/config.js",
		"config/init.js",
		"config/express.js",
		"config/passport.js",
		// Should create public files
		"public/config.js",
		"public/application.js",
		"public/humans.txt",
		"public/robots.txt",
		// Should create the user module
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
		// User settings
		"public/modules/users/views/settings/change-password.client.view.html",
		"public/modules/users/views/settings/edit-profile.client.view.html",
		"public/modules/users/views/settings/social-accounts.client.view.html",
		// User authentication
		"public/modules/users/views/authentication/signin.client.view.html",
		"public/modules/users/views/authentication/signup.client.view.html",
		// User password
		"public/modules/users/views/password/forgot-password.client.view.html",
		"public/modules/users/views/password/reset-password-invalid.client.view.html",
		"public/modules/users/views/password/reset-password-success.client.view.html",
		"public/modules/users/views/password/reset-password.client.view.html",
		// Should create the core module
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
		"public/modules/core/views/header.client.view.html",
		"public/modules/core/views/home.client.view.html",
		"public/modules/core/core.client.module.js",
		// Should create project files
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
		"package.json",
		"bower.json"
	];

	var expectedArticlesFiles = [
		// Should create controllers
		"app/controllers/articles.server.controller.js",
		// Should create models
		"app/models/article.server.model.js",
		// Should create routes
		"app/routes/articles.server.routes.js",
		// Should create the articles module config
		"public/modules/articles/config/articles.client.routes.js",
		"public/modules/articles/config/articles.client.config.js",
		// Should create the articles module controller
		"public/modules/articles/controllers/articles.client.controller.js",
		// Should create the articles module service
		"public/modules/articles/services/articles.client.service.js",
		// Should create the articles module tests
		"public/modules/articles/tests/articles.client.controller.test.js",
		// Should create the articles module views
		"public/modules/articles/views/create-article.client.view.html",
		"public/modules/articles/views/edit-article.client.view.html",
		"public/modules/articles/views/list-articles.client.view.html",
		"public/modules/articles/views/view-article.client.view.html",
		// Should create the articles module init
		"public/modules/articles/articles.client.module.js"
	];
	/**
	 * Clean up temp directory
	 */
	afterEach(function() {
		temp.cleanup();
	});

	/**
	 * Setup the temp directory
	 */
	beforeEach(function(done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
			if (err) {
				console.log('Error', err);
				return err;
			}
			done();
		});
	});

	/**
	 * Test project creation with
	 */
	describe('Application generator without sample module', function() {
		beforeEach(function(done) {
			runGenerator('app',
				'',
				this, {
					'appName': 'MEAN',
					'appDescription': 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
					'appKeywords': 'MongoDB, Express, AngularJS, Node.js',
					'appAuthor': 'Test',
					'addArticleExample': false
				}, done
			);
		});

		it('should create expected files when sample article module is not added ', function() {
			assert.file(expectedProjectFiles);
		});
	});

	describe('Application generator with sample module', function() {
		beforeEach(function(done) {
			runGenerator('app',
				'',
				this, {
					'appName': 'MEAN',
					'appDescription': 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
					'appKeywords': 'MongoDB, Express, AngularJS, Node.js',
					'appAuthor': 'Test',
					'addArticleExample': true
				}, done
			);
		});

		it('should create expected files when sample article module is added', function() {
			assert.file(expectedProjectFiles.concat(expectedArticlesFiles));
		});
	});

	/**
	 * Express tests
	 */
	describe('Express Sub Generators Tests', function() {
		describe('Generate an express controller through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('express-controller',
					'foo',
					this,
					'', done);
			});

			it('should generate an express controller file', function() {
				assert.file('app/controllers/foo.server.controller.js');
			});
		});

		describe('Generate an express model through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('express-model',
					'foo',
					this,
					'', done);
			});

			it('should generate an express model and an associated test file', function() {
				assert.file('app/models/foo.server.model.js');
				assert.file('app/tests/foo.server.model.test.js');
			});
		});

		describe('Generate an express route through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('express-route',
					'foo',
					this,
					'', done);
			});

			it('should generate an express route file', function() {
				assert.file('app/routes/foo.server.routes.js');
			});
		});

		describe('Generate an express test through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('express-test',
					'foo',
					this,
					'', done);
			});

			it('should generate an express route file', function() {
				assert.file('app/models/foo.server.model.js');
				assert.file('app/tests/foo.server.model.test.js');
			});
		});
	});

	describe('AngularJS Sub Generators Tests', function() {
		describe('Generate an AngularJS config file through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('angular-config',
					'foo',
					this, {
						'moduleName': 'core'
					}, done);
			});

			it('should generate an angular config file', function(done) {
				assert.file('public/modules/core/config/foo.client.config.js');
				done();
			});
		});

		describe('Generate an AngularJS controller with tests through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('angular-controller',
					'foo',
					this, {
						'moduleName': 'core'
					}, done);
			});

			it('should generate an angular controller file', function(done) {
				assert.file('public/modules/core/controllers/foo.client.controller.js');
				assert.file('public/modules/core/tests/foo.client.controller.test.js');
				done();
			});
		});

		describe('Generate an AngularJS directive file through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('angular-directive',
					'foo',
					this, {
						'moduleName': 'core'
					}, done);
			});

			it('should generate an angular directive file', function() {
				assert.file('public/modules/core/directives/foo.client.directive.js');
			});
		});

		describe('Generate an AngularJS filter file through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('angular-filter',
					'foo',
					this, {
						'moduleName': 'core'
					}, done);
			});

			it('should generate an angular filter file', function() {
				assert.file('public/modules/core/filters/foo.client.filter.js');
			});
		});

		describe('Generate an AngularJS route files through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('angular-route',
					'foo',
					this, {
						'moduleName': 'core',
						'routePath': 'fooroute',
						'viewName': 'fooview',
						'controllerName': 'fooctrl'
					}, done);
			});

			it('should generate an angular route file', function() {
				assert.file('public/modules/core/controllers/fooctrl.client.controller.js');
				assert.file('public/modules/core/views/fooview.client.view.html');
				assert.file('public/modules/core/tests/fooctrl.client.controller.test.js');
			});
		});

		describe('Generate an AngularJS service file through the sub-generator', function() {
			beforeEach(function(done) {
				runGenerator('angular-service',
					'foo',
					this, {
						'moduleName': 'core'
					}, done);
			});

			it('should generate an angular service file', function() {
				assert.file('public/modules/core/services/foo.client.service.js');
			});
		});

		describe('Generate an AngularJS view files through the sub-generator', function() {
			describe('Do not add a route path', function() {
				beforeEach(function(done) {
					runGenerator('angular-view',
						'foo',
						this, {
							'moduleName': 'core',
							'controllerName': 'fooctrl',
							'addRoute': false
						}, done);
				});

				it('should generate an angular view file', function() {
					assert.file('public/modules/core/views/foo.client.view.html');
				});
			});

			describe('Add a route path', function() {
				beforeEach(function(done) {
					runGenerator('angular-view',
						'foo',
						this, {
							'moduleName': 'core',
							'controllerName': 'fooctrl',
							'addRoute': true,
							'routePath': 'fooroute'
						}, done);
				});

				it('should generate an angular view file', function() {
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
	helpers.testDirectory(workspace, function(err) {

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