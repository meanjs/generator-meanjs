'use strict';
var Log = require('../app/log.js'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator'),
  mkdirp = require('mkdirp');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.slugifiedName = s.slugify(s.humanize(this.name));
  },

  askForModuleFolders: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'folders',
      message: 'Which folders would you like your module to include?',
      choices: [{
        value: 'config',
        name: 'config',
        checked: true
      }, {
        value: 'controllers',
        name: 'controllers',
        checked: true
      }, {
        value: 'css',
        name: 'css',
        checked: false
      }, {
        value: 'directives',
        name: 'directives',
        checked: false
      }, {
        value: 'filters',
        name: 'filters',
        checked: false
      }, {
        value: 'img',
        name: 'img',
        checked: false
      }, {
        value: 'services',
        name: 'services',
        checked: true
      }, {
        value: 'tests',
        name: 'tests',
        checked: true
      }, {
        value: 'views',
        name: 'views',
        checked: true
      }]
    }];

    this.prompt(prompts, function (props) {
      this.folders = props.folders
      done();
    }.bind(this));
  },

  renderModule: function () {
    // Create module folder
    var slugifiedName = this.slugifiedName;
    this.folders.forEach(function (folder) {
      mkdirp('modules/' + slugifiedName + '/client/' + folder);
    })
    // Render angular module definition
    this.template('_.client.module.js', 'modules/' + this.slugifiedName + '/client/'
      + this.slugifiedName + '.client.module.js');
  }
});

module.exports = ModuleGenerator;