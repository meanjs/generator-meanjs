'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedName = this._.slugify(this._.humanize(this.name));
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
		this.mkdir('public/modules/' + this.slugifiedName);

		// Create module sub-folders
		if (this.addConfigFolder) this.mkdir('public/modules/' + this.slugifiedName + '/config');
		if (this.addControllersFolder) this.mkdir('public/modules/' + this.slugifiedName + '/controllers');
		if (this.addCSSFolder) this.mkdir('public/modules/' + this.slugifiedName + '/css');
		if (this.addDirectivesFolder) this.mkdir('public/modules/' + this.slugifiedName + '/directives');
		if (this.addFiltersFolder) this.mkdir('public/modules/' + this.slugifiedName + '/filters');
		if (this.addImagesFolder) this.mkdir('public/modules/' + this.slugifiedName + '/img');
		if (this.addServicesFolder) this.mkdir('public/modules/' + this.slugifiedName + '/services');
		if (this.addTestsFolder) this.mkdir('public/modules/' + this.slugifiedName + '/tests');
		if (this.addViewsFolder) this.mkdir('public/modules/' + this.slugifiedName + '/views');

		// Render angular module definition
		this.template('_.client.module.js', 'public/modules/' + this.slugifiedName + '/' + this.slugifiedName + '.client.module.js');
	}
});

module.exports = ModuleGenerator;
