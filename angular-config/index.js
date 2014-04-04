'use strict';

var util = require('util'),
	yeoman = require('yeoman-generator');


var ConfigGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this configuration file belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			
			this.dasherizedModuleName = this._.dasherize(this.moduleName);
			this.humanizedModuleName = this._.humanize(this.moduleName);

			this.dasherizedName = this._.dasherize(this.name);

			done();
		}.bind(this));
	},

	renderConfigFile: function() {
		this.template('_config.js', 'public/modules/' + this.dasherizedModuleName + '/services/' + this.dasherizedName + '.js')
	}
});

module.exports = ConfigGenerator;