var Promise = require('bluebird'),
    child_process = require('child_process'),
    s = require('underscore.string'),
    generators = require('yeoman-generator'),
    mkdirp = require('mkdirp'),
    log = require('../app/log');

var exec = function (cmd) {
    return new Promise(function (resolve, reject) {
        child_process.exec(cmd, function (err, res) {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

// Global Variables
var folderPath;

module.exports = generators.NamedBase.extend({

    init: function() {
        this.moduleName = s(this.name).slugify().value();
        this.capitalizedModuleName = s(this.name).capitalize().value();
    },

    promptForFolder: function () {
        var done = this.async();

        var prompt = {
            name: 'folder',
            message: 'In which folder would you like the module to be generated? This can be changed later.',
            default: 'modules'
        };

        this.prompt(prompt, function (props) {
            folder = props.folder;
            folderPath = './' + folder + '/' + this.moduleName + '/';
            done();
        }.bind(this));
    },

    createFolders: function() {
        mkdirp(folderPath);
        mkdirp(folderPath + "/client");
        mkdirp(folderPath + "/client/config");
        mkdirp(folderPath + "/client/controllers");
        mkdirp(folderPath + "/client/services");
        mkdirp(folderPath + "/client/views");
        mkdirp(folderPath + "/server");
        mkdirp(folderPath + "/server/config");
        mkdirp(folderPath + "/server/controllers");
        mkdirp(folderPath + "/server/models");
        mkdirp(folderPath + "/server/policies");
        mkdirp(folderPath + "/server/routes");
        mkdirp(folderPath + "/tests");
        mkdirp(folderPath + "/tests/client");
        mkdirp(folderPath + "/tests/e2e");
        mkdirp(folderPath + "/tests/server");
    },

    getPrompts: function() {
        var done = this.async();

        var prompts = [{
            type: 'confirm',
            name: 'addAngularModule',
            message: 'Would you like to generate the AngularJS Route?',
            default: true
        }, {
            type: 'confirm',
            name: 'addExpressModule',
            message: 'Would you like to generate the Express Module?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.addAngularModule = props.addAngularModule;
            this.addExpressModule = props.addExpressModule;

            done();
        }.bind(this));
    },

    copyTemplates: function() {

        var files = {
            'module.client.module.js' : folderPath  + "/client/" + this.moduleName + ".client.module.js",
            'module.client.config.js' : folderPath + "/client/config/" + this.moduleName + ".client.config.js",
            'module.client.controller.js' : folderPath  + "/client/controllers/" + this.moduleName + ".client.controller.js",
            'module.client.routes.js' : folderPath  + "/client/config/" + this.moduleName + ".client.routes.js",
            'module.client.service.js' : folderPath  + "/client/services/" + this.moduleName + ".client.service.js",
            'views/create.client.view.html' : folderPath  + "/client/views/create.client.view.html",
            'views/edit.client.view.html' : folderPath  + "/client/views/edit.client.view.html",
            'views/list.client.view.html' : folderPath  + "/client/views/list.client.view.html",
            'views/view.client.view.html' : folderPath  + "/client/views/view.client.view.html",
            'module.server.config.js' : folderPath  + "/server/config/" + this.moduleName + ".server.config.js",
            'module.server.controller.js' : folderPath  + "/server/controllers/" + this.moduleName + ".server.controller.js",
            'module.server.model.js' : folderPath  + "/server/models/" + this.moduleName + ".server.model.js",
            'module.server.policy.js' : folderPath  + "/server/policies/" + this.moduleName + ".server.policy.js",
            'module.server.routes.js' : folderPath  + "/server/routes/" + this.moduleName + ".server.routes.js"
        };

        for(var template in files) {
            this.fs.copyTpl(
                this.templatePath(template),
                this.destinationPath(files[template]),
                {
                    moduleName: this.name,
                    capitalizedModuleName: this.capitalizedModuleName
                }
            );
        }
    },

    removeAngularModule: function () {
        if(!this.addAngularModule) {
            exec('rm -rf ' + folderPath + 'client')
                .catch(function (err) {
                    log.red(err);
                    return;
                });
        }
    },

    removeExpressModule: function () {
        if(!this.addExpressModule) {
            exec('rm -rf ' + folderPath + 'server')
                .catch(function (err) {
                    log.red(err);
                    return;
                });
        }
    }
});
