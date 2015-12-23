'use strict';

var util = require('util'),
  fs = require('fs'),
  yeoman = require('yeoman-generator'),
  s = require('underscore.string'),
  inflections = require('underscore.inflections'),
  modulesHelper = require('../utilities/modules.helper');

var ControllerGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.slugifiedNgControllerName = s.slugify(s.humanize(this.name));

    this.humanizedNgControllerName = s.humanize(this.slugifiedNgControllerName);

    this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgControllerName);
    if (this.availableModuleChoices == null)
      this.env.error('No modules found!');
  },
  askForModuleName: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this controller belongs to?',
      choices: this.availableModuleChoices
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.slugifiedModuleName = s.slugify(this.moduleName);

      done();
    }.bind(this));
  },
  setViewTemplateVariables: function () {
    /* Variables set in this method should be only those variables exclusively used inside the correlated templates */
    this.classifiedNgControllerName = s.classify(this.slugifiedNgControllerName);
    this.humanizedNgControllerName = s.humanize(this.slugifiedNgControllerName);
  },

  renderControllerFiles: function () {
    this.template('_.client.controller.js', 'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedNgControllerName + '.client.controller.js');
    this.template('_.client.controller.test.js', 'modules/' + this.slugifiedModuleName + '/client/tests/' + this.slugifiedNgControllerName + '.client.controller.test.js');
  }
});

module.exports = ControllerGenerator;