'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');

var ConfigGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedNgConfigName = this._.slugify(this._.humanize(this.name));
		this.classifiedNgConfigName = this._.classify(this.slugifiedNgConfigName);
		this.humanizedNgConfigName = this._.humanize(this.slugifiedNgConfigName);
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgConfigName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this configuration file belongs to?',
			choices: this.availableModuleChoices
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = this._.slugify(this._.humanize(this.moduleName));
			
			done();
		}.bind(this));
	},
	setViewTemplateVariables: function() {
		/* Variables set in this method should be only those variables exclusively used inside the correlated templates */
		this.humanizedModuleName = this._.humanize(this.moduleName);
	},

	renderConfigFile: function() {
		this.template('_.client.config.js', 'modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedNgConfigName + '.client.config.js')
	}
});

module.exports = ConfigGenerator;
