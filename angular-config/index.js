'use strict';

var yeoman = require('yeoman-generator'),
  s = require('underscore.string'),
  inflections = require('underscore.inflections'),
  modulesHelper = require('../utilities/modules.helper');

var ConfigGenerator = yeoman.generators.NamedBase.extend({

  init: function () {
    this.slugifiedNgConfigName = s.slugify(s.humanize(this.name));
    this.classifiedNgConfigName = s.classify(this.slugifiedNgConfigName);
    this.humanizedNgConfigName = s.humanize(this.slugifiedNgConfigName);
    this.slugifiedPluralName = inflections.pluralize(this.slugifiedNgConfigName);
    this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgConfigName);
    if (this.availableModuleChoices == null)
      this.env.error('No modules found!');
  },
  askForModuleName: function () {
    var done = this.async();
    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this configuration file belongs to?',
      choices: this.availableModuleChoices
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.slugifiedModuleName = s.slugify(s.humanize(this.moduleName));

      done();
    }.bind(this));
  },
  setViewTemplateVariables: function () {
    /* Variables set in this method should be only those variables exclusively used inside the correlated templates */
    this.humanizedModuleName = s.humanize(this.moduleName);
  },

  renderConfigFile: function () {
    this.template('_.client.config.js', 'modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedPluralName + '.client.config.js')
  }
});

module.exports = ConfigGenerator;