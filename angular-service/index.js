'use strict';

var fs = require('fs'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator');

var ServiceGenerator = yeoman.generators.Base.extend({
  askForModuleName: function () {
    var modulesFolder = process.cwd() + '/modules/';
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this service belongs to?',
      choices: []
    },{
      type: 'input',
      name: 'name',
      default: '',
      message: 'What is the name of the service (leave it blank to inherit it from module)?'
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

      this.slugifiedModuleName = s(this.moduleName).humanize().slugify().value();

      this.slugifiedName = s(this.name).slugify().value();
      this.classifiedName = s(this.slugifiedName).classify().value();
      this.humanizedName = s(this.slugifiedName).humanize().value();

      done();
    }.bind(this));
  },

  renderServiceFile: function () {
    this.template('_.client.service.js', 'modules/' + this.slugifiedModuleName + '/client/services/' + this.slugifiedName + '.client.service.js')
  }
});

module.exports = ServiceGenerator;
