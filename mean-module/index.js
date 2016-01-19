'use strict';

var s = require('underscore.string'),
  _ = require('lodash'),
  mkdirp = require('mkdirp'),
  yeoman = require('yeoman-generator');

var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
  },

  askForModuleFolders: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      default: '',
      message: 'What is the name of the module?',
      validate: function(input) {
        if (!input || typeof input !== 'string') {
          return 'You must provide a valid non-empty name for the module!'
        }
        return true;
      }
    },{
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
    }, {
      type: 'checkbox',
      name: 'serverFolders',
      message: 'Which server-side folders would you like your module to include?',
      choices: [{
        value: 'addConfigFolder',
        name: 'config',
        checked: false
      }, {
        value: 'addControllersFolder',
        name: 'controllers',
        checked: true
      }, {
        value: 'addConfigFolder',
        name: 'models',
        checked: true
      }, {
        value: 'addPoliciesFolder',
        name: 'policies',
        checked: false
      }, {
        value: 'addRoutesFolder',
        name: 'routes',
        checked: true
      }, {
        value: 'addTestsFolder',
        name: 'tests',
        checked: true
      }]
    }];

    this.prompt(prompts, function (props) {
      // name
      this.name = props.name;

      this.clientFolders = {};
      _.assign(this.clientFolders, props.clientFolders);

      this.serverFolders = {};
      _.assign(this.serverFolders, props.serverFolders);

      done();
    }.bind(this));
  },

  renderModule: function () {
    this.slugifiedName = s(this.name).humanize().slugify().value();
    this.humanizedName = s(this.slugifiedName).humanize().value();

    // Create module folder
    mkdirp.sync('modules/' + this.slugifiedName + '/client/');

    // Create client module sub-folders
    if (this.clientFolders.addConfigFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/config');
    }
    if (this.clientFolders.addControllersFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/controllers');
    }
    if (this.clientFolders.addCSSFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/css');
    }
    if (this.clientFolders.addDirectivesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/directives');
    }
    if (this.clientFolders.addFiltersFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/filters');
    }
    if (this.clientFolders.addImagesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/img');
    }
    if (this.clientFolders.addServicesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/services');
    }
    if (this.clientFolders.addViewsFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/views');
    }

    if (this.clientFolders.addTestsFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/tests/client');
    }

    // Render angular module definition
    this.template('_.client.module.js', 'modules/' + this.slugifiedName + '/client/' + this.slugifiedName + '.client.module.js');

    // Create server module sub-folders
    if (this.serverFolders.addConfigFolder ||
        this.serverFolders.addControllersFolder ||
        this.serverFolders.addConfigFolder ||
        this.serverFolders.addPoliciesFolder ||
        this.serverFolders.addRoutesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
    }

    if (this.serverFolders.addTestsFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/tests/server');
    }

    // Render server module config
    this.template('_.server.config.js', 'modules/' + this.slugifiedName + '/server/config/' + this.slugifiedName + '.server.config.js');
  }
});

module.exports = ModuleGenerator;
