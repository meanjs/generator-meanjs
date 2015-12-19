'use strict';
var util = require('util'),
    s = require('underscore.string'),
    _ = require('lodash'),
    mkdirp = require('mkdirp'),
    yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
    init: function() {
        this.slugifiedName = s(this.name).humanize().slugify().value();
        this.humanizedName = s(this.slugifiedName).humanize().value();
    },

    askForModuleFolders: function() {
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'clientFolders',
            message: 'Which client-side folders would you like your module to include?',
            choices: [{
                value: 'addConfigFolder',
                name: 'config',
                checked: true
            }, {
                value: 'addControllersFolder',
                name: 'controllers',
                checked: true
            }, {
                value: 'addCSSFolder',
                name: 'css',
                checked: false
            }, {
                value: 'addDirectivesFolder',
                name: 'directives',
                checked: false
            }, {
                value: 'addFiltersFolder',
                name: 'filters',
                checked: false
            }, {
                value: 'addImagesFolder',
                name: 'img',
                checked: false
            }, {
                value: 'addServicesFolder',
                name: 'services',
                checked: true
            }, {
                value: 'addTestsFolder',
                name: 'tests',
                checked: true
            }, {
                value: 'addViewsFolder',
                name: 'views',
                checked: true
            }]
        },{
            type: 'checkbox',
            name: 'serverFolders',
            message: 'Which server-side folders would you like your module to include?',
            choices: [{
                value: 'addServerConfigFolder',
                name: 'config',
                checked: false
            }, {
                value: 'addServerControllersFolder',
                name: 'controllers',
                checked: true
            }, {
                value: 'addServerConfigFolder',
                name: 'models',
                checked: true
            }, {
                value: 'addServerPoliciesFolder',
                name: 'policies',
                checked: false
            }, {
                value: 'addServerRoutesFolder',
                name: 'routes',
                checked: true
            }, {
                value: 'addServerTestsFolder',
                name: 'tests',
                checked: true
            }]
        }];

        this.prompt(prompts, function(props) {
            // client-side
            this.addConfigFolder = _.contains(props.clientFolders, 'addConfigFolder');
            this.addControllersFolder = _.contains(props.clientFolders, 'addControllersFolder');
            this.addCSSFolder = _.contains(props.clientFolders, 'addCSSFolder');
            this.addDirectivesFolder = _.contains(props.clientFolders, 'addDirectivesFolder');
            this.addFiltersFolder = _.contains(props.clientFolders, 'addFiltersFolder');
            this.addImagesFolder = _.contains(props.clientFolders, 'addImagesFolder');
            this.addServicesFolder = _.contains(props.clientFolders, 'addServicesFolder');
            this.addTestsFolder = _.contains(props.clientFolders, 'addTestsFolder');
            this.addViewsFolder = _.contains(props.clientFolders, 'addViewsFolder');

            //server-side
            this.addServerConfigFolder = _.contains(props.serverFolders, 'addServerConfigFolder');
            this.addServerControllersFolder = _.contains(props.serverFolders, 'addServerControllersFolder');
            this.addServerConfigFolder = _.contains(props.serverFolders, 'addServerConfigFolder');
            this.addServerPoliciesFolder = _.contains(props.serverFolders, 'addServerPoliciesFolder');
            this.addServerRoutesFolder = _.contains(props.serverFolders, 'addServerRoutesFolder');
            this.addServerTestsFolder = _.contains(props.serverFolders, 'addServerTestsFolder');

            done();
        }.bind(this));
    },

    renderModule: function() {
        // Create module folder
        mkdirp.sync('modules/' + this.slugifiedName + '/client/');

        // Create client module sub-folders
        if (this.addConfigFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/config');
        if (this.addControllersFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/controllers');
        if (this.addCSSFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/css');
        if (this.addDirectivesFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/directives');
        if (this.addFiltersFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/filters');
        if (this.addImagesFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/img');
        if (this.addServicesFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/services');
        if (this.addViewsFolder) mkdirp.sync('modules/' + this.slugifiedName + '/client/views');

        if (this.addTestsFolder) mkdirp.sync('modules/' + this.slugifiedName + '/tests/client');

        // Render angular module definition
        this.template('_.client.module.js', 'modules/' + this.slugifiedName + '/client/' + this.slugifiedName + '.client.module.js');

        // Create server module sub-folders
        if (this.addServerConfigFolder) mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
        if (this.addServerControllersFolder) mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
        if (this.addServerConfigFolder) mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
        if (this.addServerPoliciesFolder) mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
        if (this.addServerRoutesFolder) mkdirp.sync('modules/' + this.slugifiedName + '/server/config');

        if (this.addServerTestsFolder) mkdirp.sync('modules/' + this.slugifiedName + '/tests/server');

        // Render server module config
        this.template('_.server.config.js', 'modules/' + this.slugifiedName + '/server/config/' + this.slugifiedName + '.server.config.js');
    }
});

module.exports = ModuleGenerator;