'use strict';

var fs = require('fs'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator');

var RouteGenerator = yeoman.generators.Base.extend({
  askForModuleName: function () {
    var modulesFolder = process.cwd() + '/modules/';
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this route belongs to?',
      choices: []
    },{
      type: 'input',
      name: 'name',
      default: '',
      message: 'What is the name of the route (leave it blank to inherit it from module)?'
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
      this.slugifiedName = s(this.name).humanize().slugify().value();

      done();
    }.bind(this));
  },

  createRouteFile: function () {
    this.template('_.server.routes.js', 'modules/' + this.slugifiedModuleName + '/server/routes/' + this.slugifiedName + '.server.routes.js')
  }
});

module.exports = RouteGenerator;
