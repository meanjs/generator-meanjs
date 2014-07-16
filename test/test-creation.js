'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp');
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

describe('meanjs generator without sample app', function() {

    /**
     * Cleanup temp folder after test run
     */
    after(function(){
        temp.cleanup();
    });


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

    /**
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

describe('meanjs generator with sample app', function() {

    /**
     * Cleanup temp folder after test run
     */
    after(function(){
        temp.cleanup();
    });


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
