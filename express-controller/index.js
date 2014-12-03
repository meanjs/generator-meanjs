'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedControllerName = this._.slugify(this._.humanize(this.name));

		this.humanizedName = this._.humanize(this.slugifiedControllerName);
		this.humanizedPluralName = inflections.pluralize(this._.humanize(this.slugifiedControllerName));
		this.humanizedSingularName = inflections.singularize(this._.humanize(this.slugifiedControllerName));
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices('./modules');
	},
	askForModule: function() {
		var done = this.async();
		
		var prompts = [{
			type: 'list',
			name: 'moduleChoice',
			message: 'Which module would you like to add this controller to?',
			choices: this.availableModuleChoices
		}];
		
		this.prompt(prompts, function(props) {
			this.moduleChoice = props.moduleChoice || this.slugifiedControllerName;
			
			console.log(this.moduleChoice);
			done();
		}.bind(this));
	},
	renderTemplate: function() {
		this.template('_.server.controller.js', 
					  'modules/' + this.moduleChoice +'/server/controllers/' + this.slugifiedControllerName + '.server.controller.js')
	}
});

module.exports = ControllerGenerator;