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
		}];

		this.prompt(prompts, function(props) {
			this.addCSSFolder = this._.contains(props.folders, 'addCSSFolder');
			this.addImagesFolder = this._.contains(props.folders, 'addImagesFolder');
			this.addDirectivesFolder = this._.contains(props.folders, 'addDirectivesFolder');
			this.addFiltersFolder = this._.contains(props.folders, 'addFiltersFolder');

			done();
		}.bind(this));
	},

	renderModule: function() {
		// Create module folder
		this.mkdir('public/modules/' + this.slugifiedPluralName);

		// Create module supplemental folders
		if (this.addCSSFolder) this.mkdir('public/modules/' + this.slugifiedPluralName + '/css');
		if (this.addImagesFolder) this.mkdir('public/modules/' + this.slugifiedPluralName + '/img');
		if (this.addDirectivesFolder) this.mkdir('public/modules/' + this.slugifiedPluralName + '/directives');
		if (this.addFiltersFolder) this.mkdir('public/modules/' + this.slugifiedPluralName + '/filters');

		// Render express module files
		this.template('express-module/_controller.js', 'app/controllers/' + this.slugifiedPluralName + '.server.controller.js');
		this.template('express-module/_model.js', 'app/models/' + this.slugifiedSingularName + '.server.model.js');
		this.template('express-module/_routes.js', 'app/routes/' + this.slugifiedPluralName + '.server.routes.js');
		this.template('express-module/_tests.js', 'app/tests/' + this.slugifiedPluralName + '.server.model.test.js');

		// Render angular module files
		this.template('angular-module/config/_routes.js', 'public/modules/' + this.slugifiedPluralName + '/config/' + this.slugifiedPluralName + '.client.routes.js');
		this.template('angular-module/controllers/_controller.js', 'public/modules/' + this.slugifiedPluralName + '/controllers/' + this.slugifiedPluralName + '.client.controller.js');
		this.template('angular-module/services/_service.js', 'public/modules/' + this.slugifiedPluralName + '/services/' + this.slugifiedPluralName + '.client.service.js');
		this.template('angular-module/tests/_tests.spec.js', 'public/modules/' + this.slugifiedPluralName + '/tests/' + this.slugifiedPluralName + '.client.controller.test.js');

		// Render angular module views
		this.template('angular-module/views/_create.html', 'public/modules/' + this.slugifiedPluralName + '/views/create.' + this.slugifiedSingularName + '.client.view.html');
		this.template('angular-module/views/_edit.html', 'public/modules/' + this.slugifiedPluralName + '/views/edit.' + this.slugifiedSingularName + '.client.view.html');
		this.template('angular-module/views/_list.html', 'public/modules/' + this.slugifiedPluralName + '/views/list.' + this.slugifiedPluralName + '.client.view.html');
		this.template('angular-module/views/_view.html', 'public/modules/' + this.slugifiedPluralName + '/views/view' + this.slugifiedSingularName + '.client.view.html');

		// Render angular module definition
		this.template('angular-module/_module.js', 'public/modules/' + this.slugifiedPluralName + '/' + this.slugifiedPluralName + '.client.module.js');
	}
});

module.exports = ModuleGenerator;