'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedName = this._.slugify(this.name);

		this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
		this.slugifiedSingularName = inflections.singularize(this.slugifiedName);

		this.camelizedPluralName = this._.camelize(this.slugifiedPluralName);
		this.camelizedSingularName = this._.camelize(this.slugifiedSingularName);

		this.classifiedPluralName = this._.classify(this.slugifiedPluralName);
		this.classifiedSingularName = this._.classify(this.slugifiedSingularName);

		this.humanizedPluralName = this._.humanize(this.slugifiedPluralName);
		this.humanizedSingularName = this._.humanize(this.slugifiedSingularName);
	},

	askForModuleFolders: function() {
		var done = this.async();

		var prompts = [{
			type: 'checkbox',
			name: 'folders',
			message: 'Which supplemental folders would you like to include in your angular module?',
			choices: [{
				value: 'addCSSFolder',
				name: 'css',
				checked: false
			}, {
				value: 'addImagesFolder',
				name: 'img',
				checked: false
			}, {
				value: 'addDirectivesFolder',
				name: 'directives',
				checked: false
			}, {
				value: 'addFiltersFolder',
				name: 'filters',
				checked: false
			}]
		}, {
			type: 'confirm',
			name: 'addMenuItems',
			message: 'Would you like to add the CRUD module links to a menu?',
			default: true
		}];

		this.prompt(prompts, function(props) {
			this.addCSSFolder = this._.contains(props.folders, 'addCSSFolder');
			this.addImagesFolder = this._.contains(props.folders, 'addImagesFolder');
			this.addDirectivesFolder = this._.contains(props.folders, 'addDirectivesFolder');
			this.addFiltersFolder = this._.contains(props.folders, 'addFiltersFolder');

			this.addMenuItems = props.addMenuItems;

			done();
		}.bind(this));
	},

	askForMenuId: function() {
		if (this.addMenuItems) {
			var done = this.async();

			var prompts = [{
				name: 'menuId',
				message: 'What is your menu identifier(Leave it empty and press ENTER for the default "topbar" menu)?',
				default: 'topbar'
			}];

			this.prompt(prompts, function(props) {
				this.menuId = props.menuId;

				done();
			}.bind(this));
		}
	},

	renderModule: function() {
		// Create module folder
		this.mkdir('modules/' + this.slugifiedPluralName);
		this.mkdir('modules/' + this.slugifiedPluralName + '/client');
		this.mkdir('modules/' + this.slugifiedPluralName + '/server');
		this.mkdir('modules/' + this.slugifiedPluralName + '/tests');

		// Create module supplemental folders
		if (this.addCSSFolder) this.mkdir('modules/' + this.slugifiedPluralName + '/client/css');
		if (this.addImagesFolder) this.mkdir('modules/' + this.slugifiedPluralName + '/client/img');
		if (this.addDirectivesFolder) this.mkdir('modules/' + this.slugifiedPluralName + '/client/directives');
		if (this.addFiltersFolder) this.mkdir('modules/' + this.slugifiedPluralName + '/client/filters');

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
		this.template('client/views/_.view.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/view-' + this.slugifiedSingularName + '.client.view.html');

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

module.exports = ModuleGenerator;