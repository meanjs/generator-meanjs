'use strict';
var yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');

var RouteGenerator = yeoman.generators.NamedBase.extend({
	createRouteFile: function() {
		this.slugifiedRouteName = this._.slugify(this._.humanize(this.name));

		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedRouteName);
		if (this.availableModuleChoices == null)
			return;
	},
	askForModule: function() {
		var done = this.async();
		
		var prompts = [{
			type: 'list',
			name: 'moduleChoice',
			message: 'Which module would you like to add this route to?',
			choices: this.availableModuleChoices
		}];
		
		this.prompt(prompts, function(props) {
			this.moduleChoice = props.moduleChoice || this.slugifiedRouteName;
			done();
		}.bind(this));
	},
	renderTemplate: function() {
		this.template('_.server.routes.js', 'modules/' + this.moduleChoice + '/server/routes/' + this.slugifiedRouteName + '.server.routes.js');
	}
});

module.exports = RouteGenerator;