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

			done();
		}.bind(this));
	},

	renderFilterFile: function() {
		this.template('_filter.js', 'public/modules/' + this._.slugify(this.moduleName) + '/filters/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = FilterGenerator;