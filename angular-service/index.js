'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');

var ServiceGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedNgServiceName = this._.slugify(this._.humanize(this.name));
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgServiceName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/public/modules/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this service belongs to?',
			choices: this.availableModuleChoices
		}];


		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;

			this.slugifiedModuleName = this._.slugify(this.moduleName);
			
			done();
		}.bind(this));
	},
	setViewTemplateVariables: function() {
		/* Variables set in this method should be only those variables exclusively used inside the correlated templates */
		this.classifiedNgServiceName = this._.classify(this.slugifiedNgServiceName);
		this.humanizedNgServiceName = this._.humanize(this.slugifiedNgServiceName);
	},
	renderServiceFile: function() {
		this.template('_.client.service.js', 'modules/' + this.slugifiedModuleName + '/client/services/' + this.slugifiedNgServiceName + '.client.service.js')
	}
});

module.exports = ServiceGenerator;
