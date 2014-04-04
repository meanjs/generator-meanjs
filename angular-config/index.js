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
			
			this.slugifiedModuleName = this._.slugify(this.moduleName);
			this.humanizedModuleName = this._.humanize(this.moduleName);

			this.slugifiedName = this._.slugify(this.name);

			done();
		}.bind(this));
	},

	renderConfigFile: function() {
		this.template('_config.js', 'public/modules/' + this.slugifiedModuleName + '/services/' + this.slugifiedName + '.js')
	}
});

module.exports = ConfigGenerator;