'use strict';

var s = require('underscore.string'),
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

    this.prompt(prompts, function (props) {
      // name
      this.name = props.name;

      // client-side
      this.addConfigFolder = props.addConfigFolder;
      this.addControllersFolder = props.addControllersFolder;
      this.addCSSFolder = props.addCSSFolder;
      this.addDirectivesFolder = props.addDirectivesFolder;
      this.addFiltersFolder = props.addFiltersFolder;
      this.addImagesFolder = props.addImagesFolder;
      this.addServicesFolder = props.addServicesFolder;
      this.addTestsFolder = props.addTestsFolder;
      this.addViewsFolder = props.addViewsFolder;

      //server-side
      this.addServerConfigFolder = props.addServerConfigFolder;
      this.addServerControllersFolder = props.addServerControllersFolder;
      this.addServerConfigFolder = props.addServerConfigFolder;
      this.addServerPoliciesFolder = props.addServerPoliciesFolder;
      this.addServerRoutesFolder = props.addServerRoutesFolder;
      this.addServerTestsFolder = props.addServerTestsFolder;

      done();
    }.bind(this));
  },

  renderModule: function () {
    this.slugifiedName = s(this.name).humanize().slugify().value();
    this.humanizedName = s(this.slugifiedName).humanize().value();

    // Create module folder
    mkdirp.sync('modules/' + this.slugifiedName + '/client/');

    // Create client module sub-folders
    if (this.addConfigFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/config');
    }
    if (this.addControllersFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/controllers');
    }
    if (this.addCSSFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/css');
    }
    if (this.addDirectivesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/directives');
    }
    if (this.addFiltersFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/filters');
    }
    if (this.addImagesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/img');
    }
    if (this.addServicesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/services');
    }
    if (this.addViewsFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/client/views');
    }

    if (this.addTestsFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/tests/client');
    }

    // Render angular module definition
    this.template('_.client.module.js', 'modules/' + this.slugifiedName + '/client/' + this.slugifiedName + '.client.module.js');

    // Create server module sub-folders
    if (this.addServerConfigFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
    }
    if (this.addServerControllersFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
    }
    if (this.addServerConfigFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
    }
    if (this.addServerPoliciesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
    }
    if (this.addServerRoutesFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/server/config');
    }

    if (this.addServerTestsFolder) {
      mkdirp.sync('modules/' + this.slugifiedName + '/tests/server');
    }

    // Render server module config
    this.template('_.server.config.js', 'modules/' + this.slugifiedName + '/server/config/' + this.slugifiedName + '.server.config.js');
  }
});

module.exports = ModuleGenerator;
