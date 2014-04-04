'use strict';

var util = require('util'),
	yeoman = require('yeoman-generator');


var FilterGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this filter belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.dasherizedModuleName = this._.dasherize(this.moduleName);
			
			this.dasherizedName = this._.dasherize(this.name);
			this.camelizedName = this._.camelize(this.dasherizedName);
			this.humanizedName = this._.humanize(this.dasherizedName);

			done();
		}.bind(this));
	},

	renderFilterFile: function() {
		this.template('_filter.js', 'public/modules/' + this.dasherizedModuleName + '/filters/' + this.dasherizedName + '.js')
	}
});

module.exports = FilterGenerator;