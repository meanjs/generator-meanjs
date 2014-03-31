'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this controller belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;

			done();
		}.bind(this));
	},

	renderControllerFile: function() {
		this._.mixin(require('underscore.inflections'));
		this.template('_controller.js', 'public/modules/' + this._.slugify(this.moduleName) + '/controllers/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = ModuleGenerator;