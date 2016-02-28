'use strict';

var fs = require('fs'),
  s = require('underscore.string'),
  inflections = require('underscore.inflections'),
  yeoman = require('yeoman-generator');

var ControllerGenerator = yeoman.generators.Base.extend({
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
      message: 'What is the name of the controller (leave it blank to inherit it from module)?'
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

      this.slugifiedControllerName = s(this.name).humanize().slugify().value();

      this.humanizedName = s(this.slugifiedControllerName).humanize().value();
      this.humanizedPluralName = inflections.pluralize(this.humanizedName);
      this.humanizedSingularName = inflections.singularize(this.humanizedName);

      done();
    }.bind(this));
  },
  createControllerFile: function () {
    this.template('_.server.controller.js', 'modules/' + this.slugifiedModuleName + '/server/controllers/' + this.slugifiedControllerName + '.server.controller.js')
  }
});

module.exports = ControllerGenerator;
