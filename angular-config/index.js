'use strict';

var fs = require('fs'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator');

var ConfigGenerator = yeoman.generators.Base.extend({
  askForModuleName: function () {
    var modulesFolder = process.cwd() + '/modules/';
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this configuration file belongs to?',
      choices: []
    },{
      type: 'input',
      name: 'name',
      default: '',
      message: 'What is the name of the config (leave it blank to inherit it from module)?'
    }];

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
      this.humanizedModuleName = s(this.moduleName).humanize().value();

      this.slugifiedName = s(this.name).slugify().value();

      done();
    }.bind(this));
  },

  renderConfigFile: function () {
    this.template('_.client.config.js', 'modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedName + '.client.config.js')
  }
});

module.exports = ConfigGenerator;
