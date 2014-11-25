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
		'.bowerrc',
        '.csslintrc',
        '.editorconfig',
        '.jshintrc',
        '.slugignore',
        '.travis.yml',
        'bower.json',
        'config/assets/default.js',
        'config/assets/development.js',
        'config/assets/production.js',
        'config/assets/test.js',
        'config/config.js',
        'config/env/default.js',
        'config/env/development.js',
        'config/env/production.js',
        'config/env/test.js',
        'config/lib/express.js',
        'config/lib/mongoose.js',
        'config/lib/socket.io.js',
        'Dockerfile',
        'fig.yml',
        'generate-ssl-certs.sh',
        'gruntfile.js',
        'gulpfile.js',
        'karma.conf.js',
        'LICENSE.md',
        'modules/core/client/app/config.js',
        'modules/core/client/app/init.js',
        'modules/core/client/config/core.client.routes.js',
        'modules/core/client/controllers/header.client.controller.js',
        'modules/core/client/controllers/home.client.controller.js',
        'modules/core/client/core.client.module.js',
        'modules/core/client/css/core.css',
        'modules/core/client/img/brand/favicon.ico',
        'modules/core/client/img/brand/logo.png',
        'modules/core/client/img/loaders/loader.gif',
        'modules/core/client/services/menus.client.service.js',
        'modules/core/client/services/socket.io.client.service.js',
        'modules/core/client/views/header.client.view.html',
        'modules/core/client/views/home.client.view.html',
        'modules/core/server/controllers/core.server.controller.js',
        'modules/core/server/controllers/errors.server.controller.js',
        'modules/core/server/routes/core.server.routes.js',
        'modules/core/server/views/404.server.view.html',
        'modules/core/server/views/500.server.view.html',
        'modules/core/server/views/index.server.view.html',
        'modules/core/server/views/layout.server.view.html',
        'modules/core/tests/client/header.client.controller.tests.js',
        'modules/core/tests/client/home.client.controller.tests.js',
        'modules/users/client/config/users.client.config.js',
        'modules/users/client/config/users.client.routes.js',
        'modules/users/client/controllers/authentication.client.controller.js',
        'modules/users/client/controllers/password.client.controller.js',
        'modules/users/client/controllers/settings/change-password.client.controller.js',
        'modules/users/client/controllers/settings/change-profile-picture.client.controller.js',
        'modules/users/client/controllers/settings/edit-profile.client.controller.js',
        'modules/users/client/controllers/settings/manage-social-accounts.client.controller.js',
        'modules/users/client/controllers/settings/settings.client.controller.js',
        'modules/users/client/controllers/settings.client.controller.js',
        'modules/users/client/css/users.css',
        'modules/users/client/img/buttons/facebook.png',
        'modules/users/client/img/buttons/github.png',
        'modules/users/client/img/buttons/google.png',
        'modules/users/client/img/buttons/linkedin.png',
        'modules/users/client/img/buttons/twitter.png',
        'modules/users/client/img/profile/default.png',
        'modules/users/client/services/authentication.client.service.js',
        'modules/users/client/services/users.client.service.js',
        'modules/users/client/users.client.module.js',
        'modules/users/client/views/authentication/authentication.client.view.html',
        'modules/users/client/views/authentication/signin.client.view.html',
        'modules/users/client/views/authentication/signup.client.view.html',
        'modules/users/client/views/password/forgot-password.client.view.html',
        'modules/users/client/views/password/reset-password-invalid.client.view.html',
        'modules/users/client/views/password/reset-password-success.client.view.html',
        'modules/users/client/views/password/reset-password.client.view.html',
        'modules/users/client/views/settings/change-password.client.view.html',
        'modules/users/client/views/settings/change-profile-picture.client.view.html',
        'modules/users/client/views/settings/edit-profile.client.view.html',
        'modules/users/client/views/settings/manage-social-accounts.client.view.html',
        'modules/users/client/views/settings/settings.client.view.html',
        'modules/users/server/config/strategies/facebook.js',
        'modules/users/server/config/strategies/github.js',
        'modules/users/server/config/strategies/google.js',
        'modules/users/server/config/strategies/linkedin.js',
        'modules/users/server/config/strategies/local.js',
        'modules/users/server/config/strategies/twitter.js',
        'modules/users/server/config/users.server.config.js',
        'modules/users/server/controllers/users/users.authentication.server.controller.js',
        'modules/users/server/controllers/users/users.authorization.server.controller.js',
        'modules/users/server/controllers/users/users.password.server.controller.js',
        'modules/users/server/controllers/users/users.profile.server.controller.js',
        'modules/users/server/controllers/users.server.controller.js',
        'modules/users/server/models/user.server.model.js',
        'modules/users/server/routes/auth.server.routes.js',
        'modules/users/server/routes/users.server.routes.js',
        'modules/users/server/templates/reset-password-confirm-email.server.view.html',
        'modules/users/server/templates/reset-password-email.server.view.html',
        'modules/users/tests/client/authentication.client.controller.tests.js',
        'modules/users/tests/e2e/users.e2e.tests.js',
        'modules/users/tests/server/user.server.model.tests.js',
        'package.json',
        'Procfile',
        'protractor.conf.js',
        'public/dist/application.min.css',
        'public/dist/application.min.js',
        'public/humans.txt',
        'public/robots.txt',
        'README.md',
        'server.js'

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