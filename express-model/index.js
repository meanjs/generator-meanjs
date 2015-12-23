'use strict';
var inflections = require('underscore.inflections'),
  yeoman = require('yeoman-generator'),
  s = require('underscore.string'),
  modulesHelper = require('../utilities/modules.helper');


var ModelGenerator = yeoman.generators.NamedBase.extend({
  createModelFile: function () {
    // Set model names
    this.slugifiedModelName = s.slugify(s.humanize(this.name));
    this.classifiedModelName = s.classify(this.slugifiedModelName);
    this.humanizedModelName = s.humanize(this.slugifiedModelName);
    this.camelizedModelName = s.camelize(this.slugifiedModelName);

    this.slugifiedPluralModelName = inflections.pluralize(this.slugifiedModelName);

    this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedModelName);
    if (this.availableModuleChoices == null)
      this.env.error('No modules found!');
  },
  askForModule: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      message: 'Which module would you like to add this model to?',
      choices: this.availableModuleChoices
    }];

    this.prompt(prompts, function (props) {
      this.moduleChoice = props.moduleName || this.slugifiedModelName;
      done();
    }.bind(this));
  },
  renderTemplates: function () {
    // We create the model file
    this.template('_.server.model.js',
      'modules/' + this.moduleChoice + '/server/models/' + this.slugifiedModelName + '.server.model.js');

    // We create the test file for the models
    this.template('_.server.model.test.js',
      'modules/' + this.moduleChoice + '/server/tests/' + this.slugifiedModelName + '.server.model.test.js');
  }
});

module.exports = ModelGenerator;