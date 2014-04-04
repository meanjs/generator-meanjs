'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.dasherizedName = this._.dasherize(this.name);

		this.dasherizedPluralName = inflections.pluralize(this.dasherizedName);
		this.dasherizedSingularName = inflections.singularize(this.dasherizedName);

		this.camelizedPluralName = this._.camelize(this.dasherizedPluralName);
		this.camelizedSingularName = this._.camelize(this.dasherizedSingularName);

		this.classifiedPluralName = this._.classify(this.dasherizedPluralName);
		this.classifiedSingularName = this._.classify(this.dasherizedSingularName);

		this.humanizedPluralName = this._.humanize(this.dasherizedPluralName);
		this.humanizedSingularName = this._.humanize(this.dasherizedSingularName);
	},

	askForModuleFolders: function() {
		var done = this.async();

		var prompts = [{
			type: 'checkbox',
			name: 'folders',
			message: 'Which supplemental folders would you like to include?',
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
		this.mkdir('public/modules/' + this.dasherizedPluralName);

		// Create module supplemental folders
		if (this.addCSSFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/css');
		if (this.addImagesFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/img');
		if (this.addDirectivesFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/directives');
		if (this.addFiltersFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/filters');

		// Render express module files
		this.template('express-module/_controller.js', 'app/controllers/' + this.dasherizedPluralName + '.js');
		this.template('express-module/_model.js', 'app/models/' + this.dasherizedSingularName + '.js');
		this.template('express-module/_routes.js', 'app/routes/' + this.dasherizedPluralName + '.js');
		this.template('express-module/_tests.js', 'app/tests/' + this.dasherizedPluralName + '.js');

		// Render angular module files
		this.template('angular-module/config/_routes.js', 'public/modules/' + this.dasherizedPluralName + '/config/routes.js');
		this.template('angular-module/controllers/_controller.js', 'public/modules/' + this.dasherizedPluralName + '/controllers/' + this.dasherizedPluralName + '.js');
		this.template('angular-module/services/_service.js', 'public/modules/' + this.dasherizedPluralName + '/services/' + this.dasherizedPluralName + '.js');
		this.template('angular-module/tests/_tests.spec.js', 'public/modules/' + this.dasherizedPluralName + '/tests/' + this.dasherizedPluralName + '.spec.js');

		// Render angular module views
		this.template('angular-module/views/_create.html', 'public/modules/' + this.dasherizedPluralName + '/views/create.html');
		this.template('angular-module/views/_edit.html', 'public/modules/' + this.dasherizedPluralName + '/views/edit.html');
		this.template('angular-module/views/_list.html', 'public/modules/' + this.dasherizedPluralName + '/views/list.html');
		this.template('angular-module/views/_view.html', 'public/modules/' + this.dasherizedPluralName + '/views/view.html');

		// Render angular module definition
		this.template('angular-module/_module.js', 'public/modules/' + this.dasherizedPluralName + '/' + this.dasherizedPluralName + '.js');
	}
});

module.exports = ModuleGenerator;