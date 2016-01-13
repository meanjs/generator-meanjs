'use strict';

var fs = require('fs'),
  inflections = require('underscore.inflections'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator');


var ModelGenerator = yeoman.generators.Base.extend({
  askForModuleName: function () {
    var modulesFolder = process.cwd() + '/modules/';
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this controller belongs to?',
      choices: []
    },{
      type: 'input',
      name: 'name',
      default: '',
      message: 'What is the name of the model (leave it blank to inherit it from module)?'
    }];

    // Add module choices
    if (fs.existsSync(modulesFolder)) {

      fs.readdirSync(modulesFolder).forEach(function (folder) {
        var stat = fs.statSync(modulesFolder + '/' + folder);

        if (stat.isDirectory()) {
          prompts[0].choices.push({
            value: folder,
            name: folder
          });
        }
      });
    }

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.name = props.name || this.moduleName;

      this.slugifiedModuleName = s(this.moduleName).slugify().value();

      // Set model names
      this.slugifiedModelName = s(this.name).humanize().slugify().value();
      this.classifiedModelName = s(this.slugifiedModelName).classify().value();
      this.humanizedModelName = s(this.slugifiedModelName).humanize().value();
      this.camelizedModelName = s(this.slugifiedModelName).camelize().value();

      this.slugifiedPluralModelName = inflections.pluralize(this.slugifiedModelName);

      done();
    }.bind(this));
  },

  createModelFile: function () {
    // We create the model file
    this.template('_.server.model.js', 'modules/' + this.slugifiedModuleName + '/server/models/' + this.slugifiedModelName + '.server.model.js');
    // We create the test file for the models
    this.template('_.server.model.tests.js', 'modules/' + this.slugifiedModuleName + '/tests/server/' + this.slugifiedModelName + '.server.model.tests.js');
  }
});

module.exports = ModelGenerator;
