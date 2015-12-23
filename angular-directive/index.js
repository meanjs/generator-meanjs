'use strict';

var util = require('util'),
  fs = require('fs'),
  yeoman = require('yeoman-generator'),
  inflections = require('underscore.inflections'),
  s = require('underscore.string'),
  modulesHelper = require('../utilities/modules.helper');

var DirectiveGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.slugifiedNgDirectiveName = s.slugify(s.humanize(this.name));
    this.slugifiedPluralName = inflections.pluralize(this.slugifiedNgDirectiveName);
    this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgDirectiveName);
    if (this.availableModuleChoices == null)
      this.env.error('No modules found!');
  },
  askForModuleName: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this directive belongs to?',
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
    this.camelizedNgDirectiveName = s.camelize(this.slugifiedNgDirectiveName);
    this.humanizedNgDirectiveName = s.humanize(this.slugifiedNgDirectiveName);
  },

  renderDirectiveFile: function () {
    this.template('_.client.directive.js', 'modules/' + this.slugifiedModuleName
      + '/client/directives/' + this.slugifiedPluralName + '.client.directive.js')
  }
});

module.exports = DirectiveGenerator;
