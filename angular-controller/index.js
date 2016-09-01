'use strict';

var fs = require('fs'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator');

var ControllerGenerator = yeoman.generators.Base.extend({
  config: function() {
    this.config.defaults({
      "suffixes": {
        "client": {
          "controller": ".client.controller.js",
          "controller_tests": ".client.controller.tests.js"
        }
      }
    });
    this.suffixes = this.config.get('suffixes');

  },
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
      this.classifiedControllerName = s(this.slugifiedControllerName).classify().value();
      this.humanizedControllerName = s(this.slugifiedControllerName).humanize().value();

      done();
    }.bind(this));
  },

  renderControllerFiles: function () {
    this.template('_.client.controller.js', 'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedControllerName + this.suffixes.client.controller);
    this.template('_.client.controller.tests.js', 'modules/' + this.slugifiedModuleName + '/tests/client/' + this.slugifiedControllerName + this.suffixes.client.controller_tests);
  }
});

module.exports = ControllerGenerator;
