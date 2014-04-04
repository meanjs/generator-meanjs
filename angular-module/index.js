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
			message: 'Which folders would you like your module to include?',
			choices: [{
				value: 'addConfigFolder',
				name: 'config',
				checked: true
			}, {
				value: 'addControllersFolder',
				name: 'controllers',
				checked: true
			}, {
				value: 'addCSSFolder',
				name: 'css',
				checked: false
			}, {
				value: 'addDirectivesFolder',
				name: 'directives',
				checked: false
			}, {
				value: 'addFiltersFolder',
				name: 'filters',
				checked: false
			}, {
				value: 'addImagesFolder',
				name: 'img',
				checked: false
			}, {
				value: 'addServicesFolder',
				name: 'services',
				checked: true
			}, {
				value: 'addTestsFolder',
				name: 'tests',
				checked: true
			}, {
				value: 'addViewsFolder',
				name: 'views',
				checked: true
			}]
		}];

		this.prompt(prompts, function(props) {
			this.addConfigFolder = this._.contains(props.folders, 'addConfigFolder');
			this.addControllersFolder = this._.contains(props.folders, 'addControllersFolder');
			this.addCSSFolder = this._.contains(props.folders, 'addCSSFolder');
			this.addDirectivesFolder = this._.contains(props.folders, 'addDirectivesFolder');
			this.addFiltersFolder = this._.contains(props.folders, 'addFiltersFolder');
			this.addImagesFolder = this._.contains(props.folders, 'addImagesFolder');
			this.addServicesFolder = this._.contains(props.folders, 'addServicesFolder');
			this.addTestsFolder = this._.contains(props.folders, 'addTestsFolder');
			this.addViewsFolder = this._.contains(props.folders, 'addViewsFolder');

			done();
		}.bind(this));
	},

	renderModule: function() {
		// Create module folder
		this.mkdir('public/modules/' + this.dasherizedPluralName);

		// Create module sub-folders
		if (this.addConfigFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/config');
		if (this.addControllersFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/controllers');
		if (this.addCSSFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/css');
		if (this.addDirectivesFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/directives');
		if (this.addFiltersFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/filters');
		if (this.addImagesFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/img');
		if (this.addServicesFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/services');
		if (this.addTestsFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/tests');
		if (this.addViewsFolder) this.mkdir('public/modules/' + this.dasherizedPluralName + '/views');

		// Render angular module definition
		this.template('_module.js', 'public/modules/' + this.dasherizedPluralName + '/' + this.dasherizedPluralName + '.js');
	}
});

module.exports = ModuleGenerator;