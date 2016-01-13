'use strict';

var fs = require('fs'),
  inflections = require('underscore.inflections'),
  mkdirp = require('mkdirp'),
  s = require('underscore.string'),
  yeoman = require('yeoman-generator');

var folderChoices = [{
  value: 'css',
  name: 'css',
  checked: false
}, {
  value: 'img',
  name: 'img',
  checked: false
}, {
  value: 'directives',
  name: 'directives',
  checked: false
}, {
  value: 'filters',
  name: 'filters',
  checked: false
}];


var CrudGenerator = yeoman.generators.Base.extend({
  askForModule: function () {
    var modulesFolder = process.cwd() + '/modules/';
    var done = this.async();

    var prompts = [{type: 'input',
      name: 'name',
      message: 'What is the name of the CRUD module?',
      validate: function( value ) {
        if (value.length > 0) {
          return true;
        } else {
          return "Please enter a CRUD module name";
        }
      }
    },
      {
      type: 'checkbox',
      name: 'folders',
      message: 'Which supplemental folders would you like to include in your angular module?',
      choices: folderChoices
    },{
      type: 'confirm',
      name: 'addMenuItems',
      default: true,
      message: 'Would you like to add the CRUD module links to a menu?'
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.folders = props.folders;
      this.addMenuItems = props.addMenuItems;

      this.slugifiedName = s.slugify(this.name);

      this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
      this.slugifiedSingularName = inflections.singularize(this.slugifiedName);

      this.camelizedPluralName = s.camelize(this.slugifiedPluralName);
      this.camelizedSingularName = s.camelize(this.slugifiedSingularName);

      this.classifiedPluralName = s.classify(this.slugifiedPluralName);
      this.classifiedSingularName = s.classify(this.slugifiedSingularName);

      this.humanizedPluralName = s.humanize(this.slugifiedPluralName);
      this.humanizedSingularName = s.humanize(this.slugifiedSingularName);

      done();
    }.bind(this));
  },
  askForMenuId: function () {
    if (this.addMenuItems) {
      var done = this.async();

      var prompts = [{
        name: 'menuId',
        message: 'What is your menu identifier(Leave it empty and press ENTER for the default "topbar" menu)?',
        default: 'topbar'
      }];

      this.prompt(prompts, function (props) {
        this.menuId = props.menuId;

        done();
      }.bind(this));
    }
  },
  createCrudModule: function () {

    // Create module supplemental folders
    var slugifiedPluralName = this.slugifiedPluralName;
    this.folders.forEach(function (folder) {
      mkdirp('modules/' + slugifiedPluralName + '/client/' + folder);
    })

    // Render express files
    this.template('server/controllers/_.server.controller.js', 'modules/' + this.slugifiedPluralName + '/server/controllers/' + this.slugifiedPluralName + '.server.controller.js');
    this.template('server/models/_.server.model.js', 'modules/' + this.slugifiedPluralName + '/server/models/' + this.slugifiedSingularName + '.server.model.js');
    this.template('server/routes/_.server.routes.js', 'modules/' + this.slugifiedPluralName + '/server/routes/' + this.slugifiedPluralName + '.server.routes.js');
    this.template('server/policies/_.server.policy.js', 'modules/' + this.slugifiedPluralName + '/server/policies/' + this.slugifiedPluralName + '.server.policy.js');

    // Render angular files
    this.template('client/config/_.client.routes.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + '.client.routes.js');
    this.template('client/controllers/_.client.controller.js', 'modules/' + this.slugifiedPluralName + '/client/controllers/' + this.slugifiedPluralName + '.client.controller.js');
    this.template('client/services/_.client.service.js', 'modules/' + this.slugifiedPluralName + '/client/services/' + this.slugifiedPluralName + '.client.service.js');

    // Render angular module views
    this.template('client/views/_.create.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/create-' + this.slugifiedSingularName + '.client.view.html');
    this.template('client/views/_.edit.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/edit-' + this.slugifiedSingularName + '.client.view.html');
    this.template('client/views/_.list.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/list-' + this.slugifiedPluralName + '.client.view.html');

    // Render angular module definition
    this.template('client/_.client.module.js', 'modules/' + this.slugifiedPluralName + '/client/' + this.slugifiedPluralName + '.client.module.js');

    // Render menu configuration
    if (this.addMenuItems) {
      this.template('client/config/_.client.config.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + '.client.config.js');
    }

    // Render tests files
    this.template('tests/server/_.server.model.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/server/' + this.slugifiedSingularName + '.server.model.tests.js');
    this.template('tests/server/_.server.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/server/' + this.slugifiedSingularName + '.server.routes.tests.js');
    this.template('tests/client/_.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/' + this.slugifiedPluralName + '.client.controller.tests.js');
    this.template('tests/e2e/_.e2e.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/e2e/' + this.slugifiedPluralName + '.e2e.tests.js');
  }
});

module.exports = CrudGenerator;
