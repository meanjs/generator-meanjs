'use strict';

var util = require('util'),
	yeoman = require('yeoman-generator');


var ServiceGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this service belongs to?',
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

	renderServiceFile: function() {
		this.template('_service.js', 'public/modules/' + this.dasherizedModuleName + '/services/' + this.dasherizedName + '.js')
	}
});

module.exports = ServiceGenerator;