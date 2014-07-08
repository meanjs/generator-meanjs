'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var temp = require('temp');
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

describe('meanjs generator', function() {
    this.timeout(15000);

    /**
    * Cleanup temp directory after tests
    */
    after(function(){
        temp.cleanup();
    });
    
    // Mock user input as default options 
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
    

    it('creates expected files when sample article example is chosen', 
        function() {

        var expected = [
            "app/controllers/core.js",
            "app/controllers/users.js",
            "app/models/user.js",
            "app/routes/core.js",
            "app/routes/users.js",
            "app/tests/users.js",
            "public/css/common.css",
            "public/img/brand/favicon.ico",
            "public/img/brand/logo.png",
            "public/img/loaders/loader.gif",
            "public/js/application.js",
            "public/modules/users/config/config.js",
            "public/modules/users/config/routes.js",
            "public/modules/users/controllers/authentication.js",
            "public/modules/users/controllers/settings.js",
            "public/modules/users/css/users.css",
            "public/modules/users/img/buttons/facebook.png",
            "public/modules/users/img/buttons/google.png",
            "public/modules/users/img/buttons/linkedin.png",
            "public/modules/users/img/buttons/twitter.png",
            "public/modules/users/services/authentication.js",
            "public/modules/users/services/users.js",
            "public/modules/users/users.js",
            "public/modules/users/views/settings/password.html",
            "public/modules/users/views/settings/profile.html",
            "public/modules/users/views/signin.html",
            "public/modules/users/views/signup.html",
            "public/modules/core/config/routes.js",
            "public/modules/core/tests/header.spec.js",
            "public/modules/core/tests/home.spec.js",
            "public/modules/core/controllers/home.js",
            "public/modules/core/views/home.html",
            "public/modules/core/core.js",
            "config/strategies/facebook.js",
            "config/strategies/google.js",
            "config/strategies/linkedin.js",
            "config/strategies/local.js",
            "config/strategies/twitter.js",
            "config/config.js",
            "config/express.js",
            "config/passport.js",
            "config/utilities.js",
            "gruntfile.js",
            "server.js",
            "Procfile",
            "README.md",
            ".bowerrc",
            ".jshintrc",
            ".gitignore",
            ".slugignore",
            ".travis.yml",
            "app/views/404.html",
            "app/views/500.html",
            "app/views/index.html",
            "app/views/layout.html",
            "config/env/all.js",
            "config/env/development.js",
            "config/env/production.js",
            "config/env/test.js",
            "config/env/travis.js",
            "public/js/config.js",
            "public/modules/core/views/header.html",
            "public/modules/core/controllers/header.js",
            "package.json",
            "bower.json",
            "karma.conf.js"
        ];

        helpers.assertFile(expected);
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
