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
			this.dasherizedModuleName = this._.dasherize(this.moduleName);
			
			this.dasherizedName = this._.dasherize(this.name);
			this.classifiedName = this._.classify(this.dasherizedName);
			this.humanizedName = this._.humanize(this.dasherizedName);

			done();
		}.bind(this));
	},

	renderControllerFile: function() {
		this.template('_controller.js', 'public/modules/' + this.dasherizedModuleName + '/controllers/' + this.dasherizedName + '.js')
	}
});

module.exports = ControllerGenerator;