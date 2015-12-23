'use strict';

var util = require('util'),
  fs = require('fs'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator'),
  inflections = require('underscore.inflections'),
  modulesHelper = require('../utilities/modules.helper');

var ServiceGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.slugifiedNgServiceName = s.slugify(s.humanize(this.name));
    this.slugifiedPluralName = inflections.pluralize(this.slugifiedNgServiceName);
    this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgServiceName);
    if (this.availableModuleChoices == null)
      this.env.error('No modules found!');
  },
  askForModuleName: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this service belongs to?',
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
    this.classifiedNgServiceName = s.classify(this.slugifiedNgServiceName);
    this.humanizedNgServiceName = s.humanize(this.slugifiedNgServiceName);
  },
  renderServiceFile: function () {
    this.template('_.client.service.js', 'modules/' + this.slugifiedModuleName
      + '/client/services/' + this.slugifiedPluralName + '.client.service.js')
  }
});

module.exports = ServiceGenerator;