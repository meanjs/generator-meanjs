'use strict';

var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
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
		this.template('_controller.js', 'public/modules/' + this._.slugify(this.moduleName) + '/controllers/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = ControllerGenerator;