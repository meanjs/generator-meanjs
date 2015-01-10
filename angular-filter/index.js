'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var FilterGenerator = yeoman.generators.NamedBase.extend({
	init: function() {		
		this.slugifiedNgFilterName = this._.slugify(this._.humanize(this.name));
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgFilterName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this filter belongs to?',
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
		this.humanizedNgFilterName = this._.humanize(this.slugifiedNgFilterName);
		this.camelizedNgFilterName = this._.humanize(this.slugifiedNgFilterName);
	},
	renderFilterFile: function() {
		this.template('_.client.filter.js', 'modules/' + this.slugifiedModuleName 
					  + '/client/filters/' + this.slugifiedNgFilterName + '.client.filter.js')
	}
});

module.exports = FilterGenerator;
