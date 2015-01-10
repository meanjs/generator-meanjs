'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
	init: function() {		
		this.slugifiedNgDirectiveName = this._.slugify(this._.humanize(this.name));
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgDirectiveName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this directive belongs to?',
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
		this.camelizedNgDirectiveName = this._.camelize(this.slugifiedNgDirectiveName);
		this.humanizedNgDirectiveName = this._.humanize(this.slugifiedNgDirectiveName);
	},

	renderDirectiveFile: function() {
		this.template('_.client.directive.js', 'modules/' + this.slugifiedModuleName 
					  + '/client/directives/' + this.slugifiedNgDirectiveName + '.client.directive.js')
	}
});

module.exports = DirectiveGenerator;
