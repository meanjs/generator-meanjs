'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
	init: function() {		
		this.slugifiedNgControllerName = this._.slugify(this._.humanize(this.name));
		
		this.humanizedNgControllerName = this._.humanize(this.slugifiedNgControllerName);
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgControllerName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this controller belongs to?',
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
		this.classifiedNgControllerName = this._.classify(this.slugifiedNgControllerName);
		this.humanizedNgControllerName = this._.humanize(this.slugifiedNgControllerName);
	},

	renderControllerFiles: function() {
		this.template('_.client.controller.js', 'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedNgControllerName + '.client.controller.js');
		this.template('_.client.controller.test.js', 'modules/' + this.slugifiedModuleName + '/client/tests/' + this.slugifiedNgControllerName + '.client.controller.test.js');
	}
});

module.exports = ControllerGenerator;
