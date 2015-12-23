'use strict';
var inflections = require('underscore.inflections'),
  yeoman = require('yeoman-generator'),
  s = require('underscore.string'),
  modulesHelper = require('../utilities/modules.helper');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.slugifiedControllerName = s.slugify(s.humanize(this.name));

    this.humanizedName = s.humanize(this.slugifiedControllerName);
    this.humanizedPluralName = inflections.pluralize(s.humanize(this.slugifiedControllerName));
    this.humanizedSingularName = inflections.singularize(s.humanize(this.slugifiedControllerName));

    this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedControllerName);
    if (this.availableModuleChoices == null)
      this.env.error('No modules found!');
  },
  askForModule: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      message: 'Which module would you like to add this controller to?',
      choices: this.availableModuleChoices
    }];

    this.prompt(prompts, function (props) {
      this.moduleChoice = props.moduleName || this.slugifiedControllerName;
      done();
    }.bind(this));
  },
  renderTemplate: function () {
    this.template('_.server.controller.js',
      'modules/' + this.moduleChoice + '/server/controllers/' + this.slugifiedControllerName + '.server.controller.js');
  }
});

module.exports = ControllerGenerator;