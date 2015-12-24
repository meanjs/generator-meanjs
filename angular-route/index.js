'use strict';
var util = require('util'),
  fs = require('fs'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator'),
  inflections = require('underscore.inflections'),
  htmlWiring = require('html-wiring'),
  ejs = require('ejs'),
  modulesHelper = require('../utilities/modules.helper');

var RouteGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.slugifiedNgRouteName = s.slugify(s.humanize(this.name));
    this.classifiedNgRouteName = s.classify(this.slugifiedNgRouteName);
    this.slugifiedPluralName = inflections.pluralize(this.slugifiedNgRouteName);
    this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgRouteName);
    if (this.availableModuleChoices == null)
      this.env.error('No modules found!');
  },
  askForModuleName: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this route belongs to?',
      choices: this.availableModuleChoices
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;

      this.slugifiedModuleName = s.slugify(this.moduleName);

      done();
    }.bind(this));
  },

  askForRouteDetails: function () {
    var done = this.async();

    var prompts = [{
      name: 'routePath',
      message: 'What do you want your route path to be?',
      default: this.slugifiedNgRouteName
    }, {
      name: 'viewName',
      message: 'What do you want to call your view?',
      default: this.slugifiedNgRouteName
    }, {
      name: 'controllerName',
      message: 'What do you want to call your controller?',
      default: this.classifiedNgRouteName
    }];

    this.prompt(prompts, function (props) {
      this.routePath = props.routePath;
      this.viewName = props.viewName;
      this.controllerName = props.controllerName;

      /* These values may also be used in view templates */
      this.slugifiedNgViewName = s.slugify(this.viewName);
      this.slugifiedNgControllerName = s.slugify(s.humanize(this.controllerName));

      done();
    }.bind(this));
  },
  setViewTemplateVariables: function () {
    /* Variables set in this method should be only those variables exclusively used inside the correlated templates */
    this.classifiedNgControllerName = s.classify(this.slugifiedNgControllerName);
    this.humanizedNgControllerName = s.humanize(this.slugifiedNgControllerName);
    this.humanizedModuleName = s.humanize(this.moduleName);
    this.slugifiedNgRoutePath = s.slugify(this.routePath);
  },
  renderRoute: function () {
    var routesFilePath = 'modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedModuleName + '.client.routes.js';

    // If routes file exists we add a new state otherwise we render a new one
    if (fs.existsSync(routesFilePath)) {
      var routesFileContent = htmlWiring.readFileAsString(routesFilePath);

      // Append the new state
      routesFileContent = routesFileContent.replace('$stateProvider.', ejs.render(this.read('_.client.route.js'), this));

      htmlWiring.writeFileFromString(routesFileContent, routesFilePath);
    } else {
      this.template('_.client.routes.js', routesFilePath)
    }
  },
  renderRouteViewController: function () {
    this.template('_.client.controller.js',
      'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedPluralName + '.client.controller.js')
    this.template('_.client.controller.test.js',
      'modules/' + this.slugifiedModuleName + '/client/tests/' + this.slugifiedPluralName + '.client.controller.test.js')
    this.template('_.client.view.html',
      'modules/' + this.slugifiedModuleName + '/client/views/' + this.slugifiedNgViewName + '.client.view.html')
  }
});

module.exports = RouteGenerator;
