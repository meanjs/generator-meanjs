'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this service belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;

			done();
		}.bind(this));
	},

	renderServiceFile: function() {
		this.template('_service.js', 'public/modules/' + this._.slugify(this.moduleName) + '/services/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = ModuleGenerator;