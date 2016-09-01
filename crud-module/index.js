'use strict';

var util = require('util'),
  inflections = require('underscore.inflections'),
  s = require('underscore.string'),
  _ = require('lodash'),
  mkdirp = require('mkdirp'),
  yeoman = require('yeoman-generator');

var ModuleGenerator = yeoman.generators.Base.extend({
  init: function() {
  },
  config: function() {
    this.config.defaults({
      "suffixes": {
        "client": {
          "config": ".client.config.js",
          "routes": ".client.routes.js",
          "controller": ".client.controller.js",
          "services": ".client.service.js",
          "module": ".client.module.js",
          "views": ".client.view.html",
          "controller_tests": ".client.controller.tests.js",
          "routes_tests": ".client.routes.tests.js"
        },
        "server": {
          "config": ".server.config.js",
          "routes": ".server.routes.js",
          "controller": ".server.controller.js",
          "model": ".server.model.js",
          "policy": ".server.policy.js",
          "model_tests": ".server.model.tests.js",
          "routes_tests": ".server.routes.tests.js"
        }
      }
    });

    this.suffixes = this.config.get('suffixes');
  },
  askForName: function () {
   var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      default: '',
      message: 'What is the name of the module?'
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;

      this.slugifiedName = s(this.name).slugify().value();

      this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
      this.slugifiedSingularName = inflections.singularize(this.slugifiedName);

      this.camelizedPluralName = s(this.slugifiedPluralName).camelize().value();
      this.camelizedSingularName = s(this.slugifiedSingularName).camelize().value();

      this.classifiedPluralName = s(this.slugifiedPluralName).classify().value();
      this.classifiedSingularName = s(this.slugifiedSingularName).classify().value();

      this.humanizedPluralName = s(this.slugifiedPluralName).humanize().value();
      this.humanizedSingularName = s(this.slugifiedSingularName).humanize().value();

      this.capitalizedSingularName = s(this.humanizedSingularName).capitalize().value();

      done();
    }.bind(this));
  },
  askForModuleFolders: function() {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'clientFolders',
      message: 'Which client-side folders would you like your module to include?',
      choices: [{
        value: 'addCSSFolder',
        name: 'css',
        checked: false
      }, {
        value: 'addImagesFolder',
        name: 'img',
        checked: false
      }, {
        value: 'addDirectivesFolder',
        name: 'directives',
        checked: false
      }, {
        value: 'addFiltersFolder',
        name: 'filters',
        checked: false
      }]
    }, {
      type: 'confirm',
      name: 'addMenuItems',
      message: 'Would you like to add the CRUD module links to a menu?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      var clientFolders = {},
        serverFolders = {};

      _.forEach(props.clientFolders, function(prop) {
        clientFolders[prop] = true;
      });
      _.forEach(props.serverFolders, function(prop) {
        serverFolders[prop] = true;
      });

      this.clientFolders = clientFolders;
      this.serverFolders = serverFolders;

      this.addMenuItems = props.addMenuItems;

      done();
    }.bind(this));
  },

  askForMenuId: function() {
    if (this.addMenuItems) {
      var done = this.async();

      var prompts = [{
        name: 'menuId',
        message: 'What is your menu identifier(Leave it empty and press ENTER for the default "topbar" menu)?',
        default: 'topbar'
      }];

      this.prompt(prompts, function(props) {
        this.menuId = props.menuId;

        done();
      }.bind(this));
    }
  },

  renderModule: function() {
    // Create module folder
    mkdirp.sync('modules/' + this.slugifiedPluralName);

    // Create module supplemental folders
    if (this.clientFolders.addCSSFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/css');
    }

    if (this.clientFolders.addImagesFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/img');
    }

    if (this.clientFolders.addDirectivesFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/directives');
    }

    if (this.clientFolders.addFiltersFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/filters');
    }

    var suffixes = this.config.get('suffixes');

    // Render angular module files
    var clientSuffix = suffixes.client;
    this.template('client/config/_.client.routes.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + clientSuffix.routes);
    this.template('client/controllers/_.client.controller.js', 'modules/' + this.slugifiedPluralName + '/client/controllers/' + this.slugifiedPluralName + clientSuffix.controller);
    this.template('client/controllers/_.list.client.controller.js', 'modules/' + this.slugifiedPluralName + '/client/controllers/list-' + this.slugifiedPluralName + clientSuffix.controller);
    this.template('client/services/_.client.service.js', 'modules/' + this.slugifiedPluralName + '/client/services/' + this.slugifiedPluralName + clientSuffix.services);

    // Render angular tests
    this.template('tests/client/_.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/' + this.slugifiedPluralName + clientSuffix.controller_tests);
    this.template('tests/client/_.client.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/' + this.slugifiedPluralName + clientSuffix.routes_tests);
    this.template('tests/client/_.list.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/list-' + this.slugifiedPluralName + clientSuffix.controller_tests);

    // Render angular module views
    this.template('client/views/_.form.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/form-' + this.slugifiedSingularName + clientSuffix.views);
    this.template('client/views/_.view.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/view-' + this.slugifiedSingularName + clientSuffix.views);
    this.template('client/views/_.list.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/list-' + this.slugifiedPluralName + clientSuffix.views);

    // Render menu configuration
    if (this.addMenuItems) {
      this.template('client/config/_.client.config.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + clientSuffix.config);
    }

    // Render angular module definition
    this.template('client/_.client.module.js', 'modules/' + this.slugifiedPluralName + '/client/' + this.slugifiedPluralName + clientSuffix.module);

    // Render e2e tests
    this.template('tests/e2e/_.e2e.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/e2e/' + this.slugifiedPluralName + '.e2e.tests.js');

    // Render server module config
    var serverSuffix = suffixes.server;
    this.template('server/config/_.server.config.js', 'modules/' + this.slugifiedPluralName + '/server/config/' + this.slugifiedPluralName + serverSuffix.config);

    // Render express module files
    this.template('server/controllers/_.server.controller.js', 'modules/' + this.slugifiedPluralName + '/server/controllers/' + this.slugifiedPluralName + serverSuffix.controller);
    this.template('server/models/_.server.model.js', 'modules/' + this.slugifiedPluralName + '/server/models/' + this.slugifiedSingularName + serverSuffix.model);
    this.template('server/routes/_.server.routes.js', 'modules/' + this.slugifiedPluralName + '/server/routes/' + this.slugifiedPluralName + serverSuffix.routes);

    // Render express policy
    this.template('server/policies/_.server.policy.js', 'modules/' + this.slugifiedPluralName + '/server/policies/' + this.slugifiedPluralName + serverSuffix.policy);

    // Add express module tests
    this.template('tests/server/_.server.model.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/server/' + this.slugifiedSingularName + serverSuffix.model_tests);
    this.template('tests/server/_.server.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/server/' + this.slugifiedSingularName + serverSuffix.routes_tests);
  }
});

module.exports = ModuleGenerator;
