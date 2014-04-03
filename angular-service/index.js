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
			this.slugifiedModuleName = this._.slugify(this.moduleName);
			this.slugifiedName = this._.slugify(this.name);
			this.camelizedName = this._.camelize(this.slugifiedName);

			done();
		}.bind(this));
	},

	renderServiceFile: function() {
		this.template('_service.js', 'public/modules/' + slugifiedModuleName + '/services/' + slugifiedName + '.js')
	}
});

module.exports = ServiceGenerator;