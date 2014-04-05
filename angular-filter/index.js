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
			this.slugifiedModuleName = this._.slugify(this.moduleName);
			
			this.slugifiedName = this._.slugify(this._.humanize(this.name));
			this.camelizedName = this._.camelize(this.slugifiedName);
			this.humanizedName = this._.humanize(this.slugifiedName);

			done();
		}.bind(this));
	},

	renderFilterFile: function() {
		this.template('_filter.js', 'public/modules/' + this.slugifiedModuleName + '/filters/' + this.slugifiedName + '.js')
	}
});

module.exports = FilterGenerator;